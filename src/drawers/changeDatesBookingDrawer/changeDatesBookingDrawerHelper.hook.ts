import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { calculateBookingTotalPrice, getLimitDates } from '../../helpers';
import { useBooking } from '../../hooks';
import {
  IBookingData,
  IConfirmedBooking,
  ILimitDates,
  IUseBookingFormHelper,
} from '../../types';

type TFormData = Pick<IBookingData, 'checkIn' | 'checkOut'>;

interface IUseChangeDatesBookingDrawerHelper extends IUseBookingFormHelper {
  formData: TFormData;
  limitDates: {
    checkIn: ILimitDates;
    checkOut: ILimitDates;
  };
  errorMsg: string;
}

export const useChangeDatesBookingDrawerHelper = (
  bookingData: IConfirmedBooking
): IUseChangeDatesBookingDrawerHelper => {
  const { confirmedBookings, checkBookingsOverlap, confirmBooking } =
    useBooking();

  const [formData, setFormData] = useState<TFormData>({
    checkIn: bookingData.checkIn,
    checkOut: bookingData.checkOut,
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const limitDates = useMemo(
    () => getLimitDates(formData.checkIn, formData.checkOut),
    [formData]
  );

  useEffect(() => {
    const isValid = formData.checkIn && formData.checkOut;

    setIsButtonDisabled(!isValid);

    /*
     * hides the error message if a new date is selected
     */
    if (errorMsg) {
      setErrorMsg('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const handleInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateBookingOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { checkIn, checkOut } = formData;
    const { selectedBedroom, id } = bookingData;

    /*
     * checks if there is a date overlap
     */
    const hasDateOverlap = checkBookingsOverlap({
      selectedBedroom,
      checkIn,
      checkOut,
    });

    /*
     * continues the process if the chosen dates are available or if the overlap happens with the current booking
     */
    if (
      !hasDateOverlap.length ||
      (hasDateOverlap.length === 1 && hasDateOverlap[0].id === id)
    ) {
      const totalPrice = calculateBookingTotalPrice({
        selectedBedroom,
        checkIn,
        checkOut,
      });

      const bookings = confirmedBookings.map((item) => {
        if (item.id === id) {
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
        id,
        isUpdatingBooking: true,
      });
    } else {
      setErrorMsg(
        'The bedroom has already been booked for the chosen period. Please choose new dates'
      );
    }
  };

  return {
    formData,
    onChange: handleInputOnChange,
    onSubmit: handleUpdateBookingOnSubmit,
    isButtonDisabled,
    limitDates,
    errorMsg,
  };
};
