import { images } from '../assets';

export interface IBedroom {
  number: number;
  type: string;
  beds: {
    double?: number;
    single?: number;
  };
  img: string;
  fullCapacity: number;
  dailyPrice: number;
}

/**
 * constant that stores the maximum number of people possible in the biggest bedroom
 */
export const MAX_CAPACITY_BEDROOM = 4;

/**
 * constant with the available bedrooms to be booked
 */
export const hotelBedrooms: IBedroom[] = [
  {
    number: 1,
    type: 'Quadruple',
    beds: {
      double: 1,
      single: 2,
    },
    img: images.bedroom1,
    fullCapacity: 4,
    dailyPrice: 65,
  },
  {
    number: 2,
    type: 'Single',
    beds: {
      double: 1,
    },
    img: images.bedroom2,
    fullCapacity: 2,
    dailyPrice: 40,
  },
  {
    number: 3,
    type: 'Triple',
    beds: {
      double: 1,
      single: 1,
    },
    img: images.bedroom3,
    fullCapacity: 3,
    dailyPrice: 55,
  },
  {
    number: 4,
    type: 'Triple',
    beds: {
      single: 3,
    },
    img: images.bedroom4,
    fullCapacity: 3,
    dailyPrice: 50,
  },
  {
    number: 5,
    type: 'Single',
    beds: {
      single: 2,
    },
    img: images.bedroom5,
    fullCapacity: 2,
    dailyPrice: 35,
  },
];
