import {
  Button,
  Form,
  InputEmail,
  InputGroup,
  TitleForm,
} from '../../components';
import { validateName } from '../../helpers';
import { BaseDrawer } from '../baseDrawer';

import { useConfirmYourBookingDrawerHelper } from './confirmYourBookingDrawerHelper.hook';

/**
 * the form to enter name and email and make a booking
 */
export const ConfirmYourBookingDrawer = () => {
  const { formData, onChange, onSubmit, isButtonDisabled } =
    useConfirmYourBookingDrawerHelper();

  return (
    <BaseDrawer>
      <Form onSubmit={onSubmit}>
        <TitleForm>Confirm Your Booking</TitleForm>

        <InputGroup
          dataTestId="input-name"
          label="Name"
          name="name"
          value={formData.name}
          onChange={onChange}
          validation={validateName}
          validationErrorMsg="Please, enter a name with at least 3 characters"
        />

        <InputEmail value={formData.email} onChange={onChange} />

        <Button $isDisabled={isButtonDisabled} data-testid="confirm-booking">
          Confirm Booking
        </Button>
      </Form>
    </BaseDrawer>
  );
};
