import { Loader } from '@googlemaps/js-api-loader';

import '@/index.css';
import types, { typeToColor } from '@/types';
import groups from '@/groups';

const gmapApiKey = 'AIzaSyBn75Yh56Ko0zwNmB56hzkQIjOaUzmxEqg';
const main = document.querySelector('#okh-group-map');

let markers: OKHMapMarker[] = [];
let map: google.maps.Map | null = null;
let infoWindow: google.maps.InfoWindow | null = null;
let showOnlyDiversityFocused = false;
let selectedType: OKHMapTypes = 'all-types';

const createMarkers = () => groups.map((group) => {
  const color = typeToColor(group.type) || 'red';

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
    map: null,
    title: group.title,
    icon: markerImage,
  });

  google.maps.event.addListener(marker, 'mouseover', () => {
    if (infoWindow) {
      infoWindow.setContent(`${group.title}`);
      infoWindow.open(marker.getMap(), marker);
    }
  });

  google.maps.event.addListener(marker, 'mouseout', () => {
    if (infoWindow) {
      infoWindow.close();
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

const isMarkerVisible = (group: OKHMapGroup) => {
  if (showOnlyDiversityFocused && !group.isDiversityFocused) {
    return false;
  }
  return (group.type === selectedType) || (selectedType === 'all-types');
};

const redrawMarkers = () => {
  if (map) {
    markers.forEach((marker) => {
      if (marker.marker) {
        marker.marker.setMap(isMarkerVisible(marker.group) ? map : null);
      }
    });
  }
};

function handleMarkerClick(key: OKHMapTypes) {
  selectedType = key;
  redrawMarkers();
}

const countThisGroup = (checkType: OKHMapTypes) => (group: OKHMapGroup): boolean => (
  (group.type === checkType)
  && (!showOnlyDiversityFocused || (group.isDiversityFocused))
);

function getGroupsByTypeCount(checkType: OKHMapTypes) {
  if (checkType === 'all-types') {
    const all = showOnlyDiversityFocused
      ? groups.filter((group) => group.isDiversityFocused)
      : groups;
    return all.length;
  }
  return groups.filter(countThisGroup(checkType)).length;
}

const updateRadioButtonLabel = (type: OkhTypeDefinition) => {
  const labelElement = document.querySelector(`#okh-group-map #select-group label#${type.key}`);
  if (labelElement && labelElement.lastChild) {
    labelElement.lastChild.replaceWith(document.createTextNode(`${type.label} (${getGroupsByTypeCount(type.key)})`));
  }
};

const updateRadioButtonLabels = () => {
  types.forEach(updateRadioButtonLabel);
};

const addRadioButton = ({ key, isDefaultSelected = false }: OkhTypeDefinition): void => {
  const wrapper = document.querySelector('#okh-group-map #controls #select-group ');
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
  labelElement.id = key;

  wrapper.append(labelElement);
  labelElement.append(radioButtonElement);
  const labelText = document.createTextNode('');

  labelElement.append(labelText);
};

const addMarkers = () => {
  if (markers.length === 0 && map) {
    markers = createMarkers();
    redrawMarkers();
  }
};

const addRadioButtons = () => {
  if (!main) {
    console.error(new Error('missing div with id #okh-group-map'));
    return;
  }

  types.forEach(addRadioButton);

  const stylesheet = document.createElement('style');
  stylesheet.innerHTML = types
    .map((type) => `
/* Group: ${type.label} */
#okh-group-map #select-group label#${type.key} input[type='radio']:after {
  border-color: ${type.color};
  background-color: white;
}

#okh-group-map #select-group  label#${type.key} input[type='radio']:checked:after {
  border-color: white;
  background-color: ${type.color};
}
`)
    .join('\n');

  main.append(stylesheet);
};

const handleDiversityToggle = () => {
  showOnlyDiversityFocused = !showOnlyDiversityFocused;
  updateRadioButtonLabels();
  redrawMarkers();
};

const createToggleGroup = (): HTMLDivElement => {
  // based on https://www.w3schools.com/howto/howto_css_switch.asp
  const toggles = document.createElement('div');
  toggles.id = 'diversity-toggle';

  const toggleSwitch = document.createElement('label');
  toggleSwitch.className = 'toggle-switch';

  const sliderInput = document.createElement('input');
  sliderInput.type = 'checkbox';

  Object.assign(sliderInput, {
    type: 'checkbox',
    name: 'selected-type',
    onclick: handleDiversityToggle,
    checked: showOnlyDiversityFocused ? 'checked' : undefined,
  });

  const sliderSpan = document.createElement('span');
  sliderSpan.className = 'slider round';

  const text = document.createElement('label');
  const number = groups.filter((g) => g.isDiversityFocused).length;
  text.append(`Diversity Focused (${number})`);
  text.className = 'toggle-label';

  toggleSwitch.append(sliderInput, sliderSpan);

  toggles.append(toggleSwitch, text);

  return toggles;
};

const initialize = () => {
  if (!main) {
    console.error(new Error('missing div with id #okh-group-map'));
    return;
  }

  const controlsContainer = document.createElement('div');
  controlsContainer.id = 'controls';
  main.append(controlsContainer);

  const groupsSelector = document.createElement('div');
  groupsSelector.id = 'select-group';
  controlsContainer.append(groupsSelector);

  controlsContainer.append(createToggleGroup());

  const mapContainer = document.createElement('div');
  mapContainer.id = 'map';
  main.append(mapContainer);

  const loader = new Loader({
    apiKey: gmapApiKey,
    version: 'weekly',
  });
  loader.load().then(() => {
    map = new google.maps.Map(mapContainer, {
      zoom: 1,
      center: { lat: 37.0902, lng: -95.7129 },
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
    });

    infoWindow = new google.maps.InfoWindow();

    addMarkers();
    updateRadioButtonLabels();
  });

  addRadioButtons();
  addMarkers();
};

initialize();
