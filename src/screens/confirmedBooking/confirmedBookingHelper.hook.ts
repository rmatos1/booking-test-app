import { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingContext, ConfirmedBookingsContext } from '../../context';
import { IConfirmedBooking, ScreenPaths } from '../../types';

interface IUseConfirmedBookingHelper {
  onNewBookingClick: () => void;
  bookingDescription: IConfirmedBooking | null;
  isUpdatingBooking: boolean;
}

export const useConfirmedBookingHelper = (): IUseConfirmedBookingHelper => {
  const navigate = useNavigate();
  const {
    idSelectedBooking,
    isUpdatingBooking,
    successfulBooking,
    setSuccessfulBooking,
  } = useContext(BookingContext);
  const { confirmedBookings } = useContext(ConfirmedBookingsContext);

  const [showBooking, setShowBooking] = useState<boolean>(false);

  /**
   * gets all the data related to the booking in the context
   */
  const bookingDescription = useMemo(() => {
    const booking = confirmedBookings.find(
      (item) => item.id === idSelectedBooking
    );

    if (!booking || !showBooking) {
      return null;
    }

    return booking;
  }, [confirmedBookings, showBooking, idSelectedBooking]);

  /**
   * checks if the user was redirected to this page after making or updating a booking
   */
  useEffect(() => {
    if (successfulBooking) {
      setSuccessfulBooking(false);
      setShowBooking(true);
    }
  }, [successfulBooking, setSuccessfulBooking]);

  const handleNewBookingOnClick = () => {
    navigate(ScreenPaths.home);
  };

  return {
    onNewBookingClick: handleNewBookingOnClick,
    bookingDescription,
    isUpdatingBooking,
  };
};
