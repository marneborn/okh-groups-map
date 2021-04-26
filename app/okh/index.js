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

const TYPE_TO_COLOR = TYPES.reduce((acc, { key, color }) => ({ ...acc, [key]: color }), {})

const GROUPS = [
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
].map(group => ({
  ...group,
  color: TYPE_TO_COLOR[group.type] || 'red',
}));

let infoWindow;
let map;
let markers = [];

function drawMarkers(groups) {
  groups.forEach((group, i) => {
    const marker = new google.maps.Marker({
      position: group.location,
      map: map,
      title: group.title,
      icon: {
        url: `https://maps.google.com/mapfiles/ms/icons/${group.color}-dot.png`,
      },
    });

    google.maps.event.addListener(marker, 'mouseover', function() {
      infoWindow.setContent(`${group.title}<br />${group.description}`)
      infoWindow.open(marker.getMap(), marker);
    });

    google.maps.event.addListener(marker, 'mouseout', function() {
      infoWindow.close();
    });
  
    marker.addListener("click", () => {
      window.open(group.link, '_blank');
    });

    group.marker = marker;
  })

}

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: GROUPS[0].location,
  });
  infoWindow = new google.maps.InfoWindow();
  drawMarkers(GROUPS);
}

function handleMarkerClick(selectedKey) {
  console.log('selected', selectedKey)
  GROUPS.forEach(group => group.marker.setMap(((group.type === selectedKey) || (selectedKey === 'all')) ? map : null))
}

function addRadioButton({ key, label, isSelected = false }) {
  const wrapper = document.getElementById("select-group");
  const radioButtonElement = document.createElement("input");
  Object.assign(radioButtonElement, {
    type: 'radio',
    name: 'selected-type',
    // onclick: 'handleMarkerClick(this);',
    onclick: () => {
      handleMarkerClick(key)
    },
    value: key,
    checked: isSelected ? 'checked' : undefined,
  })
  const labelElement = document.createElement("label")
  Object.assign(labelElement, {
    for: key,
    innerHTML: label
  });
  const brElement = document.createElement('br');

  wrapper.appendChild(radioButtonElement);
  wrapper.appendChild(labelElement);
  wrapper.appendChild(brElement);
}

window.onload = function() {
  addRadioButton({ key: 'all', label: 'All', isSelected: true });
  TYPES.forEach(addRadioButton)
};

