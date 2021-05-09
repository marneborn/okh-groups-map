const types: OkhTypeDefinition[] = [
  {
    key: 'all-types',
    label: 'All',
    color: 'black',
  },
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
    color: '#d1dedf',
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

type ColorMap = Record<OKHMapTypes, string>
const colorMap = types.reduce<Partial<ColorMap>>(
  (accumulator: any, { key, color }: any) => ({ ...accumulator, [key]: color }),
  {},
) as ColorMap;

export default types;
export const typeToColor = (typeName: OKHMapTypes): string => colorMap[typeName];
