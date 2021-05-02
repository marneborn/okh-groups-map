// some single line comment
type Types =
  | 'all-types'
  | 'camping'
  | 'climbing'
  | 'cycling'
  | 'snowsports'
  | 'travel'
  | 'hiking-backpacking'
  | 'general';

type TypeDefinition = {
  key: Types;
  label: string;
  color: string;
}

const TYPES: TypeDefinition[] = [
  {
    key: 'camping',
    label: 'Camping',
    color: 'green',
  },
  {
    key: 'climbing',
    label: 'Climbing',
    color: 'orange',
  },
  {
    key: 'cycling',
    label: 'Cycling',
    color: 'purple',
  },
  {
    key: 'snowsports',
    label: 'Snowsports',
    color: 'white',
  },
  {
    key: 'travel',
    label: 'Travel',
    color: 'yellow',
  },
  {
    key: 'hiking-backpacking',
    label: 'Hiking/Backpacking',
    color: 'blue',
  },
  {
    key: 'general',
    label: 'General',
    color: 'cyan',
  },
];

const TYPE_TO_COLOR = TYPES.reduce((accumulator, { key, color }) => ({ ...accumulator, [key]: color }), {});

type Group = {
  key: string;
  title: string;
  type: Types;
  description?: string;
  link: string;
  location: { lat: number, lng: number };
};

const GROUPS: Group[] = [
  {
    key: 'fbg/SoCalCampingFamilies',
    title: 'SoCal Camping Families',
    type: 'camping',
    link: 'https://www.facebook.com/groups/SoCalCampingFamilies/',
    location: { lat: 34.026828449740044, lng: -118.01665771132564 },
  },
  {
    key: 'fbg/1443578215674448',
    title: 'Camping With Kids Australia',
    type: 'camping',
    link: 'https://www.facebook.com/groups/1443578215674448/',
    location: { lat: -26.1295137658768, lng: 134.0490238204947 },
  },
  {
    key: 'fbg/290454152007828',
    title: 'Camping with Kids - Michigan',
    type: 'camping',
    link: 'https://www.facebook.com/groups/290454152007828/',
    location: { lat: 43.56490692376151, lng: -85.32633949592457 },
  },
  {
    key: 'fbg/618757821806922',
    title: 'Michigan camping with kids',
    type: 'camping',
    link: 'https://www.facebook.com/groups/618757821806922/',
    location: { lat: 43.25841185352083, lng: -84.92381438105467 },
  },
  {
    key: 'fbg/2784264118470265',
    title: 'Houston Area Camping With Kids',
    type: 'camping',
    link: 'https://www.facebook.com/groups/2784264118470265/',
    location: { lat: 29.790955365578725, lng: -95.39594764797539 },
  },
  {
    key: 'fbg/427403721126033',
    title: 'Camping with children / family camping UK',
    type: 'camping',
    link: 'https://www.facebook.com/groups/427403721126033/',
    location: { lat: 52.61366979578046, lng: -1.4030364384592091 },
  },
  {
    key: 'fbg/387843808713958',
    title: 'Florida camping with kids',
    type: 'camping',
    link: 'https://www.facebook.com/groups/387843808713958/',
    location: { lat: 28.412612145221107, lng: -81.86446384095603 },
  },
  {
    key: 'fbg/mwcac',
    title: 'Mums who Caravan and Camp',
    type: 'camping',
    link: 'https://www.facebook.com/groups/mwcac/',
    location: { lat: -28.2033017002211, lng: 135.40313489836436 },
  },
  {
    key: 'fbg/1962193577363629',
    title: 'Victoria\'s camping with kids',
    type: 'camping',
    link: 'https://www.facebook.com/groups/1962193577363629/',
    location: { lat: -37.317887309598326, lng: 144.1626981292932 },
  },
  {
    key: 'fbg/2215859585359325',
    title: 'Camping with Kids in France',
    type: 'camping',
    link: 'https://www.facebook.com/groups/2215859585359325/',
    location: { lat: 46.3340139390375, lng: 2.226752896952243 },
  },
  {
    key: 'fbg/641173915998956',
    title: 'Family Cycling UK',
    type: 'cycling',
    link: 'https://www.facebook.com/groups/641173915998956/',
    location: { lat: 51.982579655925385, lng: -1.686496497915583 },
  },
  {
    key: 'fbg/368596593337075',
    title: 'San Francisco Family Biking',
    type: 'cycling',
    link: 'https://www.facebook.com/groups/368596593337075/',
    location: { lat: 37.760799457734244, lng: -122.44446277149525 },
  },
  {
    key: 'forum/fe00a394b67f969293aeb61a3f0dc959',
    title: 'Cycling UK Forum: Family Cycling section',
    type: 'cycling',
    link: 'https://forum.cyclinguk.org/viewforum.php?f=54&sid=fe00a394b67f969293aeb61a3f0dc959',
    location: { lat: 52.28142758741014, lng: -2.416497117454137 },
  },
  {
    key: 'fbg/246431686287133',
    title: 'Skiing with kids in Switzerland',
    type: 'snowsports',
    link: 'https://www.facebook.com/groups/246431686287133/',
    location: { lat: 46.95560166978635, lng: 8.204990834503349 },
  },
  {
    key: 'fbg/littleskierstwincities',
    title: 'Little Skiers - Twin Cities',
    type: 'snowsports',
    link: 'https://www.facebook.com/groups/littleskierstwincities',
    location: { lat: 44.97062504335736, lng: -93.1845949480072 },
  },
  {
    key: 'fbg/kidswhohikenh',
    title: 'Kids Who Hike NH ',
    type: 'hiking-backpacking',
    link: 'https://m.facebook.com/groups/kidswhohikeNH',
    location: { lat: 43.75688207976632, lng: -71.53771530898311 },
  },
  {
    key: 'fbg/460558788352776',
    title: 'Moms Adventure Club of Hardin county Tennessee',
    type: 'general',
    link: 'https://www.facebook.com/groups/460558788352776/',
    location: { lat: 35.22445080620592, lng: -88.19748425996403 },
  },
  {
    key: 'fbg/213218650561997',
    title: 'Rock climbing parents/families of Utah',
    type: 'climbing',
    link: 'https://www.facebook.com/groups/213218650561997/',
    location: { lat: 40.619357457163936, lng: -112.03448065211585 },
  },
  {
    key: '',
    title: 'Western North Carolina Adventure Kids',
    type: 'general',
    link: 'https://m.facebook.com/groups/842618332989042/',
    location: { lat: 35.780558518305405, lng: -82.08416049369399 },
  },

  /*
  {
    key: '',
    title: '',
    type: '',
    link: '',
    location: { lat: , lng: },
  },
  */
];

type GroupWithMarker = Group & { marker: google.maps.Marker }

let infoWindow: google.maps.InfoWindow;
let map: google.maps.Map;
let groupsWithMarkers: GroupWithMarker[] = [];

const drawMarkers = (groups) => groups.map((group) => {
  const color = TYPE_TO_COLOR[group.type] || 'red';

  const markerImage = {
    path: 'm -5.2916665,-25.135416 c -1.150259,1.304476 -1.870737,3.204729 -1.8427626,4.992113 0.058448,3.735104 1.6428164,5.149035 4.1765619,10.289705 0.9126989,2.2621019 1.8652861,4.6556964 2.77127616,8.6199904 0.1259165,0.58475703 0.2486989,1.12793003 0.3054951,1.17497503 0.056753,0.04717 0.1795786,-0.497996 0.3054951,-1.08275303 0.90599834,-3.9643029 1.85858594,-6.3559871 2.77128024,-8.6180894 2.5337455,-5.14067 4.1181254,-6.554609 4.1765614,-10.289717 0.027993,-1.787378 -0.6942908,-3.68953 -1.8445427,-4.994005 -1.3139631,-1.490143 -3.2958513,-2.592961 -5.40878474,-2.639071 -2.11294166,-0.04611 -4.09660336,1.056702 -5.41057986,2.546852 z',
    anchor: new google.maps.Point(0, 0),
    fillOpacity: 1,
    fillColor: color,
    strokeWeight: 1,
    strokeColor: 'black',
    scale: 1,
  };

  const marker = new google.maps.Marker({
    position: group.location,
    map,
    title: group.title,
    // icon: { url: `https://maps.google.com/mapfiles/ms/icons/${color}-dot.png` },
    icon: markerImage,
  });

  google.maps.event.addListener(marker, 'mouseover', () => {
    infoWindow.setContent(`${group.title}`);
    infoWindow.open(marker.getMap(), marker);
  });

  google.maps.event.addListener(marker, 'mouseout', () => {
    infoWindow.close();
  });

  marker.addListener('click', () => {
    window.open(group.link, '_blank');
  });

  return {
    ...group,
    marker,
  };
});

function handleMarkerClick(selectedKey: Types) {
  groupsWithMarkers.forEach((group) => {
    if (group.marker) {
      group.marker.setMap(((group.type === selectedKey) || (selectedKey === 'all-types')) ? map : null);
    }
  });
}

function getTypeCount(type: Types) {
  if (type === 'all-types') {
    return GROUPS.length;
  }
  return GROUPS.filter((group) => group.type === type).length;
}

function addRadioButton({ key, label, isDefaultSelected = false }: TypeDefinition & { isDefaultSelected?: boolean }) {
  const wrapper = document.querySelector('#okh-group-map #select-group');
  if (!wrapper) {
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
}

function initMap(): void { // eslint-disable-line @typescript-eslint/no-unused-vars
  map = new google.maps.Map(document.querySelector('#okh-group-map #map') as Element, {
    zoom: 0,
    center: { lat: 37.0902, lng: -95.7129 },
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
  });
  infoWindow = new google.maps.InfoWindow();
  groupsWithMarkers = drawMarkers(GROUPS);
  const allType: TypeDefinition = {
    key: 'all-types', 
    label: 'All',
    color: 'black',
  }
  addRadioButton({ ...allType, isDefaultSelected: true });
  TYPES.forEach(addRadioButton);
}

const gmapApiKey = 'AIzaSyBn75Yh56Ko0zwNmB56hzkQIjOaUzmxEqg';
const main = document.querySelector('#okh-group-map');

if (main) {
  const selectorcontainer = document.createElement('div');
  selectorcontainer.id = 'select-group';

  const mapcontainer = document.createElement('div');
  mapcontainer.id = 'map';

  const gmapscript = document.createElement('script');
  gmapscript.src = `https://maps.googleapis.com/maps/api/js?key=${gmapApiKey}&callback=initMap&libraries=&v=weekly`;
  gmapscript.async = true;

  // <link rel="stylesheet" href="https://storage.googleapis.com/okh-groups-map/index.css"></link>

  const stylesheet = document.createElement('style');
  const dynamicStyle = TYPES
    .map((type) => `
/* Group: ${type.label} */
#okh-group-map label.${type.key} input[type='radio']:after {
  border-color: ${type.color};
  background-color: white;
}

#okh-group-map label.${type.key} input[type='radio']:checked:after {
  border-color: black;
  background-color: ${type.color};
}

`)
    .join('\n\n')
  stylesheet.innerHTML = dynamicStyle;

  main.append(selectorcontainer);
  main.append(mapcontainer);
  main.append(gmapscript);
  main.append(stylesheet);
} else {
  console.log('missing div with id #okh-group-map'); // eslint-disable-line no-console
}
