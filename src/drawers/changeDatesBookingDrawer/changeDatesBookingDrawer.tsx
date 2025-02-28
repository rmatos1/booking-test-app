import { BookingForm, ErrorText, TitleForm } from "../../components";
import { IConfirmedBooking, IBaseDrawer } from "../../types";
import { BaseDrawer } from "../baseDrawer";

import { useChangeDatesBookingDrawerHelper } from "./changeDatesBookingDrawerHelper.hook";

interface IChangeDatesBookingDrawer extends IBaseDrawer {
  bookingData: IConfirmedBooking | null;
}

/**
 * the form to choose new dates and update the booking
 * @param props.isDrawerVisible
 * @param props.onCloseDrawer
 * @param props.bookingData - all data related to the current booking
 */
export const ChangeDatesBookingDrawer = ({
  isDrawerVisible,
  onCloseDrawer,
  bookingData,
}: IChangeDatesBookingDrawer) => {
  const { onSubmit, errorMsg } = useChangeDatesBookingDrawerHelper(bookingData);

  return (
    <BaseDrawer isDrawerVisible={isDrawerVisible} onCloseDrawer={onCloseDrawer}>
      <TitleForm style={{ textAlign: "center" }}>
        Choose the new dates
      </TitleForm>

      <BookingForm onFormSubmit={onSubmit} displayGuestInput={false} />

      {errorMsg && (
        <ErrorText $isCentered data-testid="error-msg">
          {errorMsg}
        </ErrorText>
      )}
    </BaseDrawer>
  );
};
