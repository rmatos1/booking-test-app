import { Button, Form, InputGroup, TitleForm } from "../../components";
import { BaseDrawer } from "../baseDrawer";
import { IBaseDrawer } from "../../types";

import { useConfirmYourBookingDrawerHelper } from "./confirmYourBookingDrawerHelper.hook";

interface IConfirmYourBookingDrawer extends IBaseDrawer {
  selectedBedroom: number;
}

/**
 * the form to enter name and email and make a booking
 * @param props.isDrawerVisible
 * @param props.onCloseDrawer
 * @param props.selectedBedroom
 */

export const ConfirmYourBookingDrawer = ({
  isDrawerVisible,
  onCloseDrawer,
  selectedBedroom,
}: IConfirmYourBookingDrawer) => {
  const { onSubmit, isButtonDisabled, register, errors } =
    useConfirmYourBookingDrawerHelper(selectedBedroom);

  return (
    <BaseDrawer isDrawerVisible={isDrawerVisible} onCloseDrawer={onCloseDrawer}>
      <Form onSubmit={onSubmit} data-testid="confirm-your-booking-form">
        <TitleForm>Confirm Your Booking</TitleForm>

        <InputGroup
          dataTestId="input-name"
          label="Name"
          {...register("name", {
            required: true,
          })}
          validationErrorMsg={errors.name?.message}
        />

        <InputGroup
          dataTestId="input-email"
          label="Email"
          type="email"
          {...register("email", { required: true })}
          validationErrorMsg={errors.email?.message}
        />

        <Button $isDisabled={isButtonDisabled} data-testid="confirm-booking">
          Confirm Booking
        </Button>
      </Form>
    </BaseDrawer>
  );
};
