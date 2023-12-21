import {
  Button,
  ErrorText,
  Form,
  InputGroup,
  TitleForm,
} from '../../components';
import { IConfirmedBooking } from '../../types';
import { BaseDrawer } from '../baseDrawer';

import { useChangeDatesBookingDrawerHelper } from './changeDatesBookingDrawerHelper.hook';

/**
 * the form to choose new dates and update the booking
 * @param props.bookingData - all data related to the current booking
 */
export const ChangeDatesBookingDrawer = ({
  bookingData,
}: {
  bookingData: IConfirmedBooking;
}) => {
  const {
    formData,
    onChange,
    onSubmit,
    isButtonDisabled,
    limitDates,
    errorMsg,
  } = useChangeDatesBookingDrawerHelper(bookingData);

  return (
    <BaseDrawer>
      <Form onSubmit={onSubmit}>
        <TitleForm>Choose the new dates</TitleForm>

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

        <Button $isDisabled={isButtonDisabled} data-testid="update-booking">
          Update Booking
        </Button>

        {errorMsg && (
          <ErrorText $isCentered data-testid="error-msg">
            {errorMsg}
          </ErrorText>
        )}
      </Form>
    </BaseDrawer>
  );
};
