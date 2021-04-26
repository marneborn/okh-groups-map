const TYPE_TO_COLOR = {
  climbing: 'green',
  backpacking: 'blue',
};

const GROUPS = [
  {
    key: 'group1',
    title: 'Group 1',
    type: 'climbing',
    description: 'lorem ipsum',
    link: 'https://facebook.com',
    location: { lat: 38.24632, lng: -120.332019 },
  },
  {
    key: 'group2',
    title: 'Group 2',
    type: 'backpacking',
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

function handleMarkerClick(event) {
  const key = event.value;
  GROUPS.forEach(group => group.marker.setMap(((group.type === key) || (key === 'all')) ? map : null))
}