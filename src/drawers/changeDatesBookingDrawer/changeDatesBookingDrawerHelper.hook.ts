import { useState } from "react";
import { calculateBookingTotalPrice } from "../../helpers";
import { useBooking } from "../../hooks";
import { IBookingData, IConfirmedBooking } from "../../types";
import { SubmitHandler } from "react-hook-form";

type TFormData = Pick<IBookingData, "checkIn" | "checkOut">;

interface IUseChangeDatesBookingDrawerHelper {
  onSubmit: SubmitHandler<TFormData>;
  errorMsg: string;
}

export const useChangeDatesBookingDrawerHelper = (
  bookingData: IConfirmedBooking | null
): IUseChangeDatesBookingDrawerHelper => {
  const { confirmedBookings, checkBookingsOverlap, confirmBooking } =
    useBooking();

  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleUpdateBookingOnSubmit: SubmitHandler<TFormData> = (
    data: TFormData
  ) => {
    const { checkIn, checkOut } = data;

    /*
     * checks if there is a date overlap
     */
    const hasDateOverlap = checkBookingsOverlap({
      selectedBedroom: bookingData?.selectedBedroom || 0,
      checkIn,
      checkOut,
    });

    /*
     * continues the process if the chosen dates are available or if the overlap happens with the current booking
     */
    if (
      !hasDateOverlap.length ||
      (hasDateOverlap.length === 1 && hasDateOverlap[0].id === bookingData?.id)
    ) {
      if (
        bookingData?.checkIn === checkIn &&
        bookingData?.checkOut === checkOut
      ) {
        setErrorMsg(
          "You didn´t change the check-in and check-out dates. Please select at least one new date"
        );
      } else {
        const totalPrice = calculateBookingTotalPrice({
          selectedBedroom: bookingData?.selectedBedroom || 0,
          checkIn,
          checkOut,
        });

        const bookings = confirmedBookings.map((item) => {
          if (item.id === bookingData?.id) {
            return {
              ...item,
              checkIn,
              checkOut,
              totalPrice,
            };
          }

          return item;
        });

        confirmBooking({
          bookings,
          id: bookingData?.id || "",
          isUpdatingBooking: true,
        });
      }
    } else {
      setErrorMsg(
        "The bedroom has already been booked for the chosen period. Please choose new dates"
      );
    }
  };

  return {
    onSubmit: handleUpdateBookingOnSubmit,
    errorMsg,
  };
};
