import { SubmitHandler } from "react-hook-form";
import { Button, Form, InputGroup, TitleForm } from "..";
import { MAX_CAPACITY_BEDROOM } from "../../constants";
import { BookingFormDataProps } from "../../types";
import { useBookingFormHelper } from "./bookingFormHelper.hook";

export interface IBookingForm {
  onFormSubmit: SubmitHandler<BookingFormDataProps>;
  title?: string;
  displayGuestInput?: boolean;
}

/**
 * form to enter the wanted booking dates and the number of guests
 * @param props.title - when it's necessary to show a title on the form
 * @param props.onFormSubmit - function to be called on the form submit
 * @param props.displayGuestInput - when it's necessary to show the input for the number of guests
 */

export const BookingForm = ({
  onFormSubmit,
  title,
  displayGuestInput = true,
}: IBookingForm) => {
  const { isButtonDisabled, limitDates, register, handleSubmit, errors } =
    useBookingFormHelper();

  return (
    <Form
      $backgroundColor="#fff"
      $borderRadius={10}
      onSubmit={handleSubmit(onFormSubmit)}
      data-testid="booking-form"
    >
      {title && <TitleForm>{title}</TitleForm>}

      <InputGroup
        dataTestId="input-check-in"
        label="Check-in"
        type="date"
        {...register("checkIn", { required: true })}
        min={limitDates.checkIn.min}
        max={limitDates.checkIn.max}
        validationErrorMsg={errors.checkIn?.message}
      />

      <InputGroup
        dataTestId="input-check-out"
        label="Check-out"
        type="date"
        {...register("checkOut", { required: true })}
        min={limitDates.checkOut.min}
        max={limitDates.checkOut.max}
        validationErrorMsg={errors.checkOut?.message}
      />

      {displayGuestInput && (
        <InputGroup
          dataTestId="input-qty-guests"
          label="Number of guests"
          type="number"
          {...register("guests", { required: true })}
          min="1"
          max={MAX_CAPACITY_BEDROOM}
        />
      )}

      <Button $isDisabled={isButtonDisabled} data-testid="check-availability">
        {displayGuestInput ? "Check Availability" : "Update Booking"}
      </Button>
    </Form>
  );
};
