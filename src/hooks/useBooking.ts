import moment from "moment";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ConfirmedBookingsContext } from "../context";
import { ICheckBooking, IConfirmedBooking, ScreenPaths } from "../types";

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
    return bookingsOnBedroom?.filter((item) => {
      if (
        (moment(checkIn) >= moment(item.checkIn) &&
          moment(checkIn) < moment(item.checkOut)) ||
        (moment(checkOut) > moment(item.checkIn) &&
          moment(checkOut) <= moment(item.checkOut)) ||
        (moment(item.checkIn) > moment(checkIn) &&
          moment(item.checkIn) < moment(checkOut)) ||
        (moment(item.checkOut) > moment(checkIn) &&
          moment(item.checkOut) < moment(checkOut))
      ) {
        return item;
      }
    });
  };

  const confirmBooking = ({
    bookings,
    id,
    isUpdatingBooking,
  }: IConfirmBooking) => {
    setConfirmedBookings(bookings);

    const updatingUrl = isUpdatingBooking ? "&isUpdatingBooking=true" : "";

    navigate(`/${ScreenPaths.confirmedBooking}?bookingId=${id}${updatingUrl}`);
  };

  return {
    confirmedBookings,
    checkBookingsOverlap,
    confirmBooking,
  };
};
