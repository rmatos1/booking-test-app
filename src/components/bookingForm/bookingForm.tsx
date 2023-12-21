import { Button, Form, InputGroup, TitleForm } from '..';
import { MAX_CAPACITY_BEDROOM } from '../../constants';
import { IBookingForm, useBookingFormHelper } from './bookingFormHelper.hook';

/**
 * form to enter the wanted booking dates and the number of guests
 * @param props.title - when it's necessary to show a title on the form
 * @param props.onFormSubmit - additional function to be called on the form submit
 */

export const BookingForm = ({ onFormSubmit, title }: IBookingForm) => {
  const { formData, onChange, onSubmit, isButtonDisabled, limitDates } =
    useBookingFormHelper({
      onFormSubmit,
    });

  return (
    <Form $backgroundColor="#fff" $borderRadius={10} onSubmit={onSubmit}>
      {title && <TitleForm>{title}</TitleForm>}

      <InputGroup
        dataTestId="input-check-in"
        label="Check in"
        type="date"
        name="checkIn"
        value={formData.checkIn}
        onChange={onChange}
        min={limitDates.checkIn.min}
        max={limitDates.checkIn.max}
      />

      <InputGroup
        dataTestId="input-check-out"
        label="Check out"
        type="date"
        name="checkOut"
        value={formData.checkOut}
        onChange={onChange}
        min={limitDates.checkOut.min}
      />

      <InputGroup
        dataTestId="input-qty-guests"
        label="Number of guests"
        type="number"
        name="qtyGuests"
        min="1"
        max={MAX_CAPACITY_BEDROOM}
        value={formData.qtyGuests}
        onChange={onChange}
      />

      <Button $isDisabled={isButtonDisabled}>Check Availability</Button>
    </Form>
  );
};
