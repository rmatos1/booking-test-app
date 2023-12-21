import { IInputGroup, InputGroup } from '..';
import { validateEmail } from '../../helpers';

export type TInputEmail = Pick<IInputGroup, 'value' | 'onChange'>;

export const InputEmail = ({ value, onChange }: TInputEmail) => {
  return (
    <InputGroup
      dataTestId="input-email"
      label="Email"
      type="email"
      name="email"
      value={value}
      onChange={onChange}
      validation={validateEmail}
      validationErrorMsg="Please, enter a valid email"
    />
  );
};
