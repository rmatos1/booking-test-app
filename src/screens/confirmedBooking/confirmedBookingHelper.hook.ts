import { useContext, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ConfirmedBookingsContext } from "../../context";
import { IConfirmedBooking, ScreenPaths } from "../../types";

interface IUseConfirmedBookingHelper {
  onNewBookingClick: () => void;
  bookingDescription: IConfirmedBooking | undefined;
  isUpdatingBooking: boolean;
}

export const useConfirmedBookingHelper = (): IUseConfirmedBookingHelper => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const { confirmedBookings } = useContext(ConfirmedBookingsContext);

  const isUpdatingBooking = !!params.get("isUpdatingBooking");

  /**
   * gets all the data related to the booking in the context
   */
  const bookingDescription = useMemo(() => {
    const bookingId = params.get("bookingId");

    const booking = confirmedBookings?.find((item) => item.id === bookingId);

    return booking;
  }, [confirmedBookings, params]);

  const handleNewBookingOnClick = () => {
    navigate(ScreenPaths.home);
  };

  return {
    onNewBookingClick: handleNewBookingOnClick,
    bookingDescription,
    isUpdatingBooking,
  };
};
