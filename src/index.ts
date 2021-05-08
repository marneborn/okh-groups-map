okhGlobal = window as unknown as OKHGroupsMapGlobals;

okhGlobal.okhGroupsMap = {} as OKHGroupMapsGlobalVariables;

const gmapApiKey = 'AIzaSyBn75Yh56Ko0zwNmB56hzkQIjOaUzmxEqg';
const main = document.querySelector('#okh-group-map');

const ifMain = (callback) => (...properties) => {
  if (main) {
    callback(main, ...properties);
  } else {
    console.error(new Error('missing div with id #okh-group-map'));
  }
};

const loadScript = ifMain((toElement, scriptUrl, callback) => {
  const newScript = document.createElement('script');
  if (callback) {
    newScript.addEventListener('load', callback);
  }
  toElement.parentNode.insertBefore(newScript, document.currentScript);
  newScript.src = scriptUrl;
});

const drawMarkers = (groups) => groups.map((group) => {
  const color = okhGlobal.okhGroupsMap.typeToColor(group.type) || 'red';

  const markerImage = {
    path: 'm -5.2916665,-25.135416 c -1.150259,1.304476 -1.870737,3.204729 -1.8427626,4.992113 0.058448,3.735104 1.6428164,5.149035 4.1765619,10.289705 0.9126989,2.2621019 1.8652861,4.6556964 2.77127616,8.6199904 0.1259165,0.58475703 0.2486989,1.12793003 0.3054951,1.17497503 0.056753,0.04717 0.1795786,-0.497996 0.3054951,-1.08275303 0.90599834,-3.9643029 1.85858594,-6.3559871 2.77128024,-8.6180894 2.5337455,-5.14067 4.1181254,-6.554609 4.1765614,-10.289717 0.027993,-1.787378 -0.6942908,-3.68953 -1.8445427,-4.994005 -1.3139631,-1.490143 -3.2958513,-2.592961 -5.40878474,-2.639071 -2.11294166,-0.04611 -4.09660336,1.056702 -5.41057986,2.546852 z',
    anchor: new google.maps.Point(0, 0),
    fillOpacity: 1,
    fillColor: color,
    strokeWeight: 1,
    strokeColor: 'white',
    scale: 1,
  };

  const marker = new google.maps.Marker({
    position: group.location,
    map: okhGlobal.okhGroupsMap.map,
    title: group.title,
    icon: markerImage,
  });

  google.maps.event.addListener(marker, 'mouseover', () => {
    if (okhGlobal.okhGroupsMap.infoWindow) {
      okhGlobal.okhGroupsMap.infoWindow.setContent(`${group.title}`);
      okhGlobal.okhGroupsMap.infoWindow.open(marker.getMap(), marker);
    }
  });

  google.maps.event.addListener(marker, 'mouseout', () => {
    if (okhGlobal.okhGroupsMap.infoWindow) {
      okhGlobal.okhGroupsMap.infoWindow.close();
    }
  });

  marker.addListener('click', () => {
    window.open(group.link, '_blank');
  });

  return {
    group,
    marker,
  };
});

function handleMarkerClick(selectedKey: Types) {
  if (okhGlobal.okhGroupsMap.map) {
    (okhGlobal.okhGroupsMap.markers || []).forEach((marker) => {
      if (marker.marker) {
        marker.marker.setMap(((marker.group.type === selectedKey) || (selectedKey === 'all-types'))
          ? okhGlobal.okhGroupsMap.map
          : null);
      }
    });
  }
}

function getTypeCount(type: Types) {
  if (type === 'all-types') {
    return okhGlobal.okhGroupsMap.groups.length;
  }
  return okhGlobal.okhGroupsMap.groups.filter((group) => group.type === type).length;
}

type AddRadioButtonProperties = OkhTypeDefinition & { isDefaultSelected?: boolean };
const addRadioButton = ({ key, label, isDefaultSelected = false }: AddRadioButtonProperties): void => {
  const wrapper = document.querySelector('#okh-group-map #select-group');
  if (!wrapper) {
    console.error(new Error('missing div with id #okh-group-map #select-group'));
    return;
  }

  const radioButtonElement = document.createElement('input');
  Object.assign(radioButtonElement, {
    type: 'radio',
    name: 'selected-type',
    onclick: () => {
      handleMarkerClick(key);
    },
    value: key,
    checked: isDefaultSelected ? 'checked' : undefined,
  });
  const labelElement = document.createElement('label');
  labelElement.classList.add(key);

  wrapper.append(labelElement);
  labelElement.append(radioButtonElement);
  labelElement.append(`${label} (${getTypeCount(key)})`);
};

const addMarkers = () => {
  if (
    !okhGlobal.okhGroupsMap.markers
    && okhGlobal.okhGroupsMap.groups
    && okhGlobal.okhGroupsMap.types
    && okhGlobal.okhGroupsMap.map
  ) {
    okhGlobal.okhGroupsMap.markers = drawMarkers(okhGlobal.okhGroupsMap.groups);
  }
};

const addRadioButtons = ifMain((toElement) => {
  const allType: OkhTypeDefinition = {
    key: 'all-types',
    label: 'All',
    color: 'black',
    isDefaultSelected: true,
  };

  addRadioButton(allType);
  okhGlobal.okhGroupsMap.types.forEach(addRadioButton);

  const stylesheet = document.createElement('style');
  stylesheet.innerHTML = okhGlobal.okhGroupsMap.types
    .map((type) => `
/* Group: ${type.label} */
#okh-group-map label.${type.key} input[type='radio']:after {
  border-color: ${type.color};
  background-color: white;
}

#okh-group-map label.${type.key} input[type='radio']:checked:after {
  border-color: white;
  background-color: ${type.color};
}
`)
    .join('\n');

  toElement.append(stylesheet);
});

function onLoadGmap(): void {
  const parent = document.querySelector('#okh-group-map #map');
  if (!parent) {
    console.error(new Error('missing div with id #okh-group-map #map'));
    return;
  }

  okhGlobal.okhGroupsMap.map = new google.maps.Map(parent, {
    zoom: 1,
    center: { lat: 37.0902, lng: -95.7129 },
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
  });

  okhGlobal.okhGroupsMap.infoWindow = new google.maps.InfoWindow();

  addMarkers();
}

const onLoadTypes = () => {
  addRadioButtons();
  addMarkers();
};

const onLoadGroups = () => {
  addMarkers();
};

const initialize = ifMain((toElement) => {
  const selectorcontainer = document.createElement('div');
  selectorcontainer.id = 'select-group';
  toElement.append(selectorcontainer);

  const mapcontainer = document.createElement('div');
  mapcontainer.id = 'map';
  toElement.append(mapcontainer);

  const gmapscript = document.createElement('script');
  gmapscript.src = `https://maps.googleapis.com/maps/api/js?key=${gmapApiKey}&callback=${onLoadGmap.name}&libraries=&v=weekly`;
  gmapscript.async = true;
  toElement.append(gmapscript);

  loadScript('https://storage.googleapis.com/okh-groups-map/groups.js', onLoadGroups);
  loadScript('https://storage.googleapis.com/okh-groups-map/types.js', onLoadTypes);
});

initialize();
