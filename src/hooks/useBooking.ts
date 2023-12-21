import moment from 'moment';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookingContext,
  ConfirmedBookingsContext,
  DrawerContext,
} from '../context';
import { ICheckBooking, IConfirmedBooking, ScreenPaths } from '../types';

interface IConfirmBooking {
  bookings: IConfirmedBooking[];
  id: string;
  isUpdatingBooking?: boolean;
}

interface IUseBooking {
  confirmedBookings: IConfirmedBooking[];
  checkBookingsOverlap: ({
    selectedBedroom,
    checkIn,
    checkOut,
  }: ICheckBooking) => IConfirmedBooking[];
  confirmBooking: ({
    bookings,
    id,
    isUpdatingBooking,
  }: IConfirmBooking) => void;
}

export const useBooking = (): IUseBooking => {
  const navigate = useNavigate();

  const { confirmedBookings, setConfirmedBookings } = useContext(
    ConfirmedBookingsContext
  );
  const { setIdSelectedBooking, setIsUpdatingBooking, setSuccessfulBooking } =
    useContext(BookingContext);
  const { setIsDrawerVisible } = useContext(DrawerContext);

  const checkBookingsOverlap = ({
    selectedBedroom,
    checkIn,
    checkOut,
  }: ICheckBooking) => {
    /*
     * gets all the confirmed bookings for the selected bedroom
     */
    const bookingsOnBedroom = confirmedBookings.filter(
      (item) => item.selectedBedroom === selectedBedroom
    );

    /*
     * checks if there are dates that overlap with any of the previously filtered bookings
     */
    return bookingsOnBedroom?.filter(
      (item) =>
        (moment(checkIn) >= moment(item.checkIn) &&
          moment(checkIn) < moment(item.checkOut)) ||
        (moment(checkOut) > moment(item.checkIn) &&
          moment(checkOut) <= moment(item.checkOut))
    );
  };

  const confirmBooking = ({
    bookings,
    id,
    isUpdatingBooking,
  }: IConfirmBooking) => {
    setConfirmedBookings(bookings);

    setIdSelectedBooking(id);

    setSuccessfulBooking(true);

    isUpdatingBooking && setIsUpdatingBooking(true);

    navigate(`/${ScreenPaths.confirmedBooking}`);

    setIsDrawerVisible(false);
  };

  return {
    confirmedBookings,
    checkBookingsOverlap,
    confirmBooking,
  };
};
