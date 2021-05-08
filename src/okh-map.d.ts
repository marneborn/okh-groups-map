type Types =
  | 'all-types'
  | 'camping'
  | 'climbing'
  | 'cycling'
  | 'snowsports'
  | 'travel'
  | 'hiking-backpacking'
  | 'general';

type OkhTypeDefinition = {
  key: Types;
  label: string;
  color: string;
  isDefaultSelected?: boolean;
}

type Group = {
  key: string;
  title: string;
  type: Types;
  description?: string;
  link: string;
  location: { lat: number, lng: number };
};

type MapMarker = {
  marker: google.maps.Marker,
  group: Group,
}

type OKHGroupMapsGlobalVariables = {
  map: google.maps.Map;
  markers: MapMarker[];
  infoWindow: google.maps.InfoWindow;
  addedSelection: boolean;
  groups: Group[];
  types: OkhTypeDefinition[];
  typeToColor: (type: Types) => string;
}

interface OKHGroupsMapGlobals extends NodeJS.Global {
  okhGroupsMap: OKHGroupMapsGlobals;
}

declare let okhGlobal: OKHGroupsMapGlobals;
