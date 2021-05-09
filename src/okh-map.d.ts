type OKHMapTypes =
  | 'all-types'
  | 'camping'
  | 'climbing'
  | 'cycling'
  | 'snowsports'
  | 'travel'
  | 'hiking-backpacking'
  | 'general';

type OkhTypeDefinition = {
  key: OKHMapTypes;
  label: string;
  color: string;
  isDefaultSelected?: boolean;
}

type OKHMapGroup = {
  key: string;
  title: string;
  type: OKHMapTypes;
  description?: string;
  link: string;
  location: { lat: number, lng: number };
};

type OKHMapMarker = {
  marker: google.maps.Marker,
  group: OKHMapGroup,
}
