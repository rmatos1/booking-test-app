import { useContext, useEffect, useMemo } from 'react';
import { BEDROOMS, IBedroom } from '../../constants';
import { BookingContext, DrawerContext } from '../../context';
import { getDifferenceDates } from '../../helpers';
import { useBooking } from '../../hooks';

interface IResults {
  numberOfNights: number;
  bedrooms: IBedroom[];
}

interface IUseResultsListHelper {
  onBookingClick: (number: number) => void;
  isDrawerVisible: boolean;
  results: IResults;
}

export const useResultsListHelper = (): IUseResultsListHelper => {
  const { confirmedBookings, checkBookingsOverlap } = useBooking();
  const { bookingData, setBookingData } = useContext(BookingContext);
  const { isDrawerVisible, setIsDrawerVisible } = useContext(DrawerContext);

  const results = useMemo(() => {
    if (!bookingData.qtyGuests) {
      return {
        numberOfNights: 0,
        bedrooms: [],
      };
    }

    /*
     * accepts only the bedrooms with capacity for the selected number of guests
     */
    const bedroomsWithCapacity = BEDROOMS.filter(
      (item: IBedroom) => item.fullCapacity >= Number(bookingData.qtyGuests)
    );

    const availableBedrooms = bedroomsWithCapacity.filter((item) => {
      /*
       * checks if there is a date overlap, and returns the bedroom only if there isn't any booking in the selected period
       */
      const hasDateOverlap = checkBookingsOverlap({
        selectedBedroom: item.number,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
      });

      return hasDateOverlap.length ? false : item;
    });

    return {
      numberOfNights: getDifferenceDates(
        bookingData.checkIn,
        bookingData.checkOut
      ),
      bedrooms: availableBedrooms,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingData, confirmedBookings]);

  useEffect(() => {
    setIsDrawerVisible(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBookingOnClick = (number: number) => {
    setBookingData((prevData) => ({ ...prevData, selectedBedroom: number }));

    setIsDrawerVisible(true);
  };

  return {
    onBookingClick: handleBookingOnClick,
    isDrawerVisible,
    results,
  };
};
