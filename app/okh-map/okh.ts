// some single line comment
type Types = 'camping' | 'climbing' | 'cycling' | 'snowsports' | 'travel' | 'hiking=backpacking';

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
    key: 'hiking=backpacking',
    label: 'Hiking/Backpacking',
    color: 'blue',
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
];

type GroupWithMarker = Group & { marker: google.maps.Marker }

let infoWindow: google.maps.InfoWindow;
let map: google.maps.Map;
let groupsWithMarkers: GroupWithMarker[] = [];

const drawMarkers = (groups) => groups.map((group) => {
  const color = TYPE_TO_COLOR[group.type] || 'red';

  const markerImage = {
    path:"m -5.2916665,-25.135416 c -1.150259,1.304476 -1.870737,3.204729 -1.8427626,4.992113 0.058448,3.735104 1.6428164,5.149035 4.1765619,10.289705 0.9126989,2.2621019 1.8652861,4.6556964 2.77127616,8.6199904 0.1259165,0.58475703 0.2486989,1.12793003 0.3054951,1.17497503 0.056753,0.04717 0.1795786,-0.497996 0.3054951,-1.08275303 0.90599834,-3.9643029 1.85858594,-6.3559871 2.77128024,-8.6180894 2.5337455,-5.14067 4.1181254,-6.554609 4.1765614,-10.289717 0.027993,-1.787378 -0.6942908,-3.68953 -1.8445427,-4.994005 -1.3139631,-1.490143 -3.2958513,-2.592961 -5.40878474,-2.639071 -2.11294166,-0.04611 -4.09660336,1.056702 -5.41057986,2.546852 z",
    anchor: new google.maps.Point(0,0),
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
    infoWindow.setContent(`${group.title}<br />${group.description}`);
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

function initMap(): void { // eslint-disable-line @typescript-eslint/no-unused-vars
  map = new google.maps.Map(document.querySelector('#okh-group-map #map') as Element, {
    zoom: 0,
    center: { lat: 37.0902, lng: -95.7129 },
  });
  infoWindow = new google.maps.InfoWindow();
  groupsWithMarkers = drawMarkers(GROUPS);
}

function handleMarkerClick(selectedKey) {
  groupsWithMarkers.forEach((group) => {
    if (group.marker) {
      group.marker.setMap(((group.type === selectedKey) || (selectedKey === 'all')) ? map : null);
    }
  });
}

function getTypeCount(type) {
  if (type === 'all') {
    return GROUPS.length;
  }
  return GROUPS.filter((group) => group.type === type).length;
}

console.log('qwerty');
function addRadioButton({ key, label, isSelected = false }) {
  console.log('qwerty1');
  const wrapper = document.querySelector('#okh-group-map #select-group');
  console.log('qwerty2', wrapper);
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
    checked: isSelected ? 'checked' : undefined,
  });
  const labelElement = document.createElement('label');
  const brElement = document.createElement('br');

  wrapper.append(labelElement);
  labelElement.append(radioButtonElement);
  labelElement.append(`${label} (${getTypeCount(key)})`);
  wrapper.append(brElement);
}

addRadioButton({ key: 'all', label: 'All', isSelected: true });
TYPES.forEach(addRadioButton);
