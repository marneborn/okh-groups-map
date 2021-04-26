const CLIMBING = 'climbing';
const BACKPACKING = 'backpacking';

const TYPES = [
  {
    key: CLIMBING,
    label: 'Climbing',
    color: 'green',
  },
  {
    key: BACKPACKING,
    label: 'Backpacking',
    color: 'blue',
  },
];

const TYPE_TO_COLOR = TYPES.reduce((accumulator, { key, color }) => ({ ...accumulator, [key]: color }), {});

type Group = {
  key: string;
  title: string;
  type: string;
  description: string;
  link: string;
  location: { lat: number, lng: number };
  color: string;
};

type GroupWithMarker = Group & { marker: google.maps.Marker }
const GROUPS: Group[] = [
  {
    key: 'group1',
    title: 'Group 1',
    type: CLIMBING,
    description: 'lorem ipsum',
    link: 'https://facebook.com',
    location: { lat: 38.24632, lng: -120.332019 },
  },
  {
    key: 'group2',
    title: 'Group 2',
    type: BACKPACKING,
    description: 'lorem ipsum',
    link: 'https://google.com',
    location: { lat: 38.2524232, lng: -120.3344643 },
  },
].map((group) => ({
  ...group,
  color: TYPE_TO_COLOR[group.type] || 'red',
}));

let infoWindow: google.maps.InfoWindow;
let map: google.maps.Map;
let groupsWithMarkers: GroupWithMarker[] = [];

const drawMarkers = (groups) => groups.map((group) => {
  const marker = new google.maps.Marker({
    position: group.location,
    map,
    title: group.title,
    icon: {
      url: `https://maps.google.com/mapfiles/ms/icons/${group.color}-dot.png`,
    },
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
  map = new google.maps.Map(document.querySelector('#map') as Element, {
    zoom: 12,
    center: GROUPS[0].location,
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

function addRadioButton({ key, label, isSelected = false }) {
  const wrapper = document.querySelector('#select-group');
  if (!wrapper) {
    return;
  }
  const radioButtonElement = document.createElement('input');
  Object.assign(radioButtonElement, {
    type: 'radio',
    name: 'selected-type',
    // onclick: 'handleMarkerClick(this);',
    onclick: () => {
      handleMarkerClick(key);
    },
    value: key,
    checked: isSelected ? 'checked' : undefined,
  });
  const labelElement = document.createElement('label');
  Object.assign(labelElement, {
    for: key,
    innerHTML: label,
  });
  const brElement = document.createElement('br');

  wrapper.append(radioButtonElement);
  wrapper.append(labelElement);
  wrapper.append(brElement);
}

window.addEventListener('load', () => {
  addRadioButton({ key: 'all', label: 'All', isSelected: true });
  TYPES.forEach(addRadioButton);
});
