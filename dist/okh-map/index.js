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
var TYPE_TO_COLOR = TYPES.reduce(function (accumulator, _a) {
    var _b;
    var key = _a.key, color = _a.color;
    return (__assign(__assign({}, accumulator), (_b = {}, _b[key] = color, _b)));
}, {});
var GROUPS = [
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
        zoom: 0,
        center: { lat: 37.0902, lng: -95.7129 },
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
function getTypeCount(type) {
    if (type === 'all') {
        return GROUPS.length;
    }
    return GROUPS.filter(function (group) { return group.type === type; }).length;
}
function addRadioButton1(_a) {
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
        innerHTML: label + " (" + getTypeCount(key) + ")",
    });
    var brElement = document.createElement('br');
    wrapper.append(radioButtonElement);
    wrapper.append(labelElement);
    wrapper.append(brElement);
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
    var brElement = document.createElement('br');
    wrapper.append(labelElement);
    labelElement.append(radioButtonElement);
    labelElement.append(label + " (" + getTypeCount(key) + ")");
    wrapper.append(brElement);
}
window.addEventListener('load', function () {
    addRadioButton({ key: 'all', label: "All", isSelected: true });
    TYPES.forEach(addRadioButton);
});

