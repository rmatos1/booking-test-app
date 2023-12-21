import moment from 'moment';
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { BookingContext } from '../../context';
import {
  calculateBookingTotalPrice,
  validateEmail,
  validateName,
} from '../../helpers';
import { useBooking } from '../../hooks';
import { IBookingData, IUseBookingFormHelper } from '../../types';

type TFormData = Pick<IBookingData, 'name' | 'email'>;

interface IUseConfirmYourBookingDrawerHelper extends IUseBookingFormHelper {
  formData: TFormData;
}

export const useConfirmYourBookingDrawerHelper =
  (): IUseConfirmYourBookingDrawerHelper => {
    const { bookingData, setBookingData } = useContext(BookingContext);

    const { confirmedBookings, confirmBooking } = useBooking();

    const [formData, setFormData] = useState<TFormData>({
      name: bookingData.name,
      email: bookingData.email,
    });
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

    useEffect(() => {
      const isValid =
        validateEmail(formData.email) && validateName(formData.name);

      setIsButtonDisabled(!isValid);
    }, [formData]);

    const handleInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleConfirmBookingOnSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const id = `${moment().unix()}${btoa(formData.email)}`;

      const totalPrice = calculateBookingTotalPrice({
        selectedBedroom: bookingData.selectedBedroom,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
      });

      const bookings = [
        ...confirmedBookings,
        { ...bookingData, ...formData, id, totalPrice },
      ];

      confirmBooking({
        bookings,
        id,
      });

      setBookingData({
        checkIn: '',
        checkOut: '',
        qtyGuests: '',
        selectedBedroom: 0,
        name: formData.name,
        email: formData.email,
      });
    };

    return {
      formData,
      onChange: handleInputOnChange,
      onSubmit: handleConfirmBookingOnSubmit,
      isButtonDisabled,
    };
  };
