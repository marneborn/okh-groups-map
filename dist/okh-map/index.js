var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var TYPES = [
    {
        key: 'climbing',
        label: 'Climbing',
        color: 'green',
    },
    {
        key: 'backpacking',
        label: 'Backpacking',
        color: 'blue',
    },
];
var TYPE_TO_COLOR = TYPES.reduce(function (accumulator, _a) {
    var _b;
    var key = _a.key, color = _a.color;
    return (__assign(__assign({}, accumulator), (_b = {}, _b[key] = color, _b)));
}, {});
var GROUPS = [
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
];
var infoWindow;
var map;
var groupsWithMarkers = [];
var drawMarkers = function (groups) { return groups.map(function (group) {
    var color = TYPE_TO_COLOR[group.type] || 'red';
    var marker = new google.maps.Marker({
        position: group.location,
        map: map,
        title: group.title,
        icon: { url: "https://maps.google.com/mapfiles/ms/icons/" + color + "-dot.png" },
    });
    google.maps.event.addListener(marker, 'mouseover', function () {
        infoWindow.setContent(group.title + "<br />" + group.description);
        infoWindow.open(marker.getMap(), marker);
    });
    google.maps.event.addListener(marker, 'mouseout', function () {
        infoWindow.close();
    });
    marker.addListener('click', function () {
        window.open(group.link, '_blank');
    });
    return __assign(__assign({}, group), { marker: marker });
}); };
function initMap() {
    map = new google.maps.Map(document.querySelector('#map'), {
        zoom: 12,
        center: GROUPS[0].location,
    });
    infoWindow = new google.maps.InfoWindow();
    groupsWithMarkers = drawMarkers(GROUPS);
}
function handleMarkerClick(selectedKey) {
    groupsWithMarkers.forEach(function (group) {
        if (group.marker) {
            group.marker.setMap(((group.type === selectedKey) || (selectedKey === 'all')) ? map : null);
        }
    });
}
function addRadioButton(_a) {
    var key = _a.key, label = _a.label, _b = _a.isSelected, isSelected = _b === void 0 ? false : _b;
    var wrapper = document.querySelector('#select-group');
    if (!wrapper) {
        return;
    }
    var radioButtonElement = document.createElement('input');
    Object.assign(radioButtonElement, {
        type: 'radio',
        name: 'selected-type',
        onclick: function () {
            handleMarkerClick(key);
        },
        value: key,
        checked: isSelected ? 'checked' : undefined,
    });
    var labelElement = document.createElement('label');
    Object.assign(labelElement, {
        for: key,
        innerHTML: label,
    });
    var brElement = document.createElement('br');
    wrapper.append(radioButtonElement);
    wrapper.append(labelElement);
    wrapper.append(brElement);
}
window.addEventListener('load', function () {
    addRadioButton({ key: 'all', label: 'All', isSelected: true });
    TYPES.forEach(addRadioButton);
});

