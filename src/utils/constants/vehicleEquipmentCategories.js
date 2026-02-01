export const vehicleEquipmentCategories = [
  {
    label: 'AC',
    icon: 'icon-ac',
    filterKey: 'AC',
    isAvailable: v => Boolean(v.AC),
  },
  {
    label: 'Automatic',
    icon: 'icon-diagram',
    filterKey: 'automatic',
    isAvailable: v => v.transmission === 'automatic',
  },
  {
    label: 'Kitchen',
    icon: 'icon-kitchen',
    filterKey: 'kitchen',
    isAvailable: v => Boolean(v.kitchen),
  },
  {
    label: 'TV',
    icon: 'icon-tv',
    filterKey: 'TV',
    isAvailable: v => Boolean(v.TV),
  },
  {
    label: 'Bathroom',
    icon: 'icon-bathroom',
    filterKey: 'bathroom',
    isAvailable: v => Boolean(v.bathroom),
  },
  {
    label: 'Petrol',
    icon: 'icon-petrol',
    filterKey: 'petrol',
    isAvailable: v => v.engine === 'petrol',
  },
  {
    label: 'Radio',
    icon: 'icon-radio',
    filterKey: 'radio',
    isAvailable: v => Boolean(v.radio),
  },
  {
    label: 'Refrigerator',
    icon: 'icon-refrigerator',
    filterKey: 'refrigerator',
    isAvailable: v => Boolean(v.refrigerator),
  },
  {
    label: 'Microwave',
    icon: 'icon-microwave',
    filterKey: 'microwave',
    isAvailable: v => Boolean(v.microwave),
  },
  {
    label: 'Gas',
    icon: 'icon-gas',
    filterKey: 'gas',
    isAvailable: v => Boolean(v.gas),
  },
  {
    label: 'Water',
    icon: 'icon-water',
    filterKey: 'water',
    isAvailable: v => Boolean(v.water),
  },
];
