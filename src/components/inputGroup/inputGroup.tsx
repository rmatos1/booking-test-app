import { ChangeEvent } from 'react';
import { ErrorText } from '..';
import { Input, InputContainer, Label } from './inputGroup.styles';
import {
  IUseInputGroupHelperInput,
  useInputGroupHelper,
} from './inputGroupHelper.hook';

type TInputType = 'text' | 'email' | 'number' | 'date';

export interface IInputGroup extends IUseInputGroupHelperInput {
  label?: string;
  type?: TInputType;
  name: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  min?: string | number;
  max?: string | number;
  dataTestId?: string;
}

/**
 * component to show the label and the input
 * @param props.label
 * @param props.type - type of the input
 * @param props.name - name of the input used to update the input value
 * @param props.value
 * @param props.onChange
 * @param props.min - the minimum value accepted by the input. Only on number and date types
 * @param props.max - the maximum value accepted by the input. Only on number and date types
 * @param props.validation - additional validation of the input value
 * @param props.validationErrorMsg - error message to be shown if it fails the additional validation
 * @param props.dataTestId
 */
export const InputGroup = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  min,
  max,
  validation,
  validationErrorMsg,
  dataTestId,
}: IInputGroup) => {
  const { error, onBlur, onFocus } = useInputGroupHelper({
    validation,
    validationErrorMsg,
  });

  const isTypeNumberOrDate = type === 'number' || type === 'date';

  return (
    <InputContainer>
      {label && <Label data-testid="label">{label}</Label>}

      <Input
        data-testid={dataTestId || 'input-group'}
        type={type}
        name={name}
        {...(isTypeNumberOrDate ? { min, max } : {})}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        $hasError={!!error}
      />

      {error && <ErrorText data-testid="error-text">{error}</ErrorText>}
    </InputContainer>
  );
};
