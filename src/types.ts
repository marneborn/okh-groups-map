okhGlobal = window as unknown as OKHGroupsMapGlobals;
okhGlobal.okhGroupsMap = okhGlobal.okhGroupsMap || {};

okhGlobal.okhGroupsMap.types = [
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

type ColorMap = Record<Types, string>
const colorMap = okhGlobal.okhGroupsMap.types.reduce<Partial<ColorMap>>(
  (accumulator, { key, color }) => ({ ...accumulator, [key]: color }),
  {},
) as ColorMap;

okhGlobal.okhGroupsMap.typeToColor = (type: Types): string => colorMap[type];
