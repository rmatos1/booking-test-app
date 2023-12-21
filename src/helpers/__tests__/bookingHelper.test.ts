import { describe, test } from '@jest/globals';
import moment from 'moment';
import {
  calculateBookingTotalPrice,
  getDifferenceDates,
  getLimitDates,
} from '..';

const START_DATE = '2023-12-20';
const END_DATE = '2023-12-28';

describe('bookingHelper.ts > getDifferenceDates', () => {
  test('should return the difference between dates correctly', () => {
    const difference = getDifferenceDates(START_DATE, END_DATE);

    expect(difference).toBe(8);
  });

  test('should return 0 whenever the start date is bigger than the end date', () => {
    const difference = getDifferenceDates(END_DATE, START_DATE);

    expect(difference).toBe(0);
  });
});

describe('bookingHelper.ts > getLimitDates', () => {
  test('should return the specified values of check-in and check-out', () => {
    const result = getLimitDates(START_DATE, END_DATE);

    expect(result.checkIn.min).toBe(
      moment().add(1, 'days').format('YYYY-MM-DD')
    );
    expect(result.checkIn.max).toBe(
      moment(END_DATE).subtract(1, 'days').format('YYYY-MM-DD')
    );
    expect(result.checkOut.min).toBe(
      moment(START_DATE).add(1, 'days').format('YYYY-MM-DD')
    );
  });

  test('should return the specified min check-out date', () => {
    const result = getLimitDates('', END_DATE);

    expect(result.checkOut.min).toBe(
      moment().add(2, 'days').format('YYYY-MM-DD')
    );
  });

  describe('bookingHelper.ts > calculateBookingTotalPrice', () => {
    test('should return the booking total price correctly', () => {
      const totalPrice = calculateBookingTotalPrice({
        selectedBedroom: 2,
        checkIn: START_DATE,
        checkOut: END_DATE,
      });

      expect(totalPrice).toBe(320);
    });

    test('should return 0 if there is not a bedroom with the selected number', () => {
      const totalPrice = calculateBookingTotalPrice({
        selectedBedroom: 7,
        checkIn: START_DATE,
        checkOut: END_DATE,
      });

      expect(totalPrice).toBe(0);
    });
  });
});
