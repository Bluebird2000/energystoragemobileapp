const httpMock = [
  {
    id: 'u-series',
    name: 'SYSTEM MODE',
    tags: ['units', 'View-consumption'],
    count: 147,
    // image: require('../assets/icons/u-series.png')
  },
  {
    id: 's-series',
    name: 'SYSEM SUBMODE',
    tags: ['units', 'Connected-devices'],
    count: 16,
    // image: require('../assets/icons/s-series.png')
  },
  {
    id: 'u-plus',
    name: 'BATTERY %',
    tags: ['units', 'View-consumption'],
    count: 68,
    // image: require('../assets/icons/u-plus.png')
  },
  {
    id: 's-plus',
    name: 'RUN TIME',
    tags: ['units', 'Connected-devices'],
    count: 17,
    // image: require('../assets/icons/s-plus.png')
  },
];

const units = [
  {
    id: 1, 
    name: 'Wattbank U - Laptop Power bank/Portable Inverter',
    description: 'Wattbank U is an uninterrupted power supply solution for laptops and other low power devices.',
    tags: ['Interior', '27 m²', 'Ideas'],
    images: [
      // require('../assets/images/plants_1.png'),
      // require('../assets/images/plants_2.png'),
      // require('../assets/images/plants_3.png'),
      // showing only 3 images, show +6 for the rest
      // require('../assets/images/plants_1.png'),
      // require('../assets/images/plants_2.png'),
      // require('../assets/images/plants_3.png'),
      // require('../assets/images/plants_1.png'),
      // require('../assets/images/plants_2.png'),
      // require('../assets/images/plants_3.png'),
    ]
  }
];

const explore = [
  // images
  // require('../assets/images/explore_1.png'),
  // require('../assets/images/explore_2.png'),
  // require('../assets/images/explore_3.png'),
  // require('../assets/images/explore_4.png'),
  // require('../assets/images/explore_5.png'),
  // require('../assets/images/explore_6.png'),
];

const profile = {
  username: 'react-ui-kit',
  location: 'Europe',
  email: 'contact@react-ui-kit.com',
  avatar: require('../assets/images/avatar.png'),
  budget: 1000,
  monthly_cap: 5000,
  notifications: true,
  newsletter: false,
};

export {
  httpMock,
  explore,
  units,
  profile,
}