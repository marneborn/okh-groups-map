const types: OkhTypeDefinition[] = [
  {
    key: 'all-types',
    label: 'All',
    color: 'black',
    isDefaultSelected: true,
  },
  {
    key: 'camping',
    label: 'Camping',
    color: 'green',
    isDefaultSelected: false,
  },
  {
    key: 'climbing',
    label: 'Climbing',
    color: 'orange',
    isDefaultSelected: false,
  },
  {
    key: 'cycling',
    label: 'Cycling',
    color: 'purple',
    isDefaultSelected: false,
  },
  {
    key: 'snowsports',
    label: 'Snowsports',
    color: '#d1dedf',
    isDefaultSelected: false,
  },
  {
    key: 'travel',
    label: 'Travel',
    color: 'yellow',
    isDefaultSelected: false,
  },
  {
    key: 'hiking-backpacking',
    label: 'Hiking/Backpacking',
    color: 'blue',
    isDefaultSelected: false,
  },
  {
    key: 'general',
    label: 'General',
    color: 'cyan',
    isDefaultSelected: false,
  },
];

type ColorMap = Record<OKHMapTypes, string>
type PartialColorMap = Partial<ColorMap>
type AccumulatorProperty = {
  key: OKHMapTypes;
  color: string;
}
const colorMap = types.reduce<PartialColorMap>(
  (accumulator: PartialColorMap, { key, color }: AccumulatorProperty) => ({ ...accumulator, [key]: color }),
  {},
) as ColorMap;

export default types;
export const typeToColor = (typeName: OKHMapTypes): string => colorMap[typeName];
