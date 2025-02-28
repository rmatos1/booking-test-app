import { forwardRef } from "react";
import { ErrorText } from "..";
import { Input, InputContainer, Label } from "./inputGroup.styles";
import {
  IUseInputGroupHelperInput,
  useInputGroupHelper,
} from "./inputGroupHelper.hook";

type TInputType = "text" | "email" | "number" | "date";

export interface IInputGroup extends IUseInputGroupHelperInput {
  label?: string;
  type?: TInputType;
  min?: string | number;
  max?: string | number;
  dataTestId?: string;
}

export const InputGroup = forwardRef<HTMLInputElement, IInputGroup>(
  (
    {
      label,
      type = "text",
      min,
      max,
      validationErrorMsg,
      dataTestId,
      ...props
    },
    ref
  ) => {
    const { error, onBlur, onFocus } = useInputGroupHelper({
      validationErrorMsg,
    });

    const isTypeNumberOrDate = type === "number" || type === "date";

    return (
      <InputContainer>
        {label && <Label data-testid="label">{label}</Label>}

        <Input
          {...props}
          ref={ref}
          data-testid={dataTestId || "input-group"}
          type={type}
          {...(isTypeNumberOrDate ? { min, max } : {})}
          onFocus={onFocus}
          onBlur={onBlur}
          $hasError={!!error}
        />

        {error && <ErrorText data-testid="error-text">{error}</ErrorText>}
      </InputContainer>
    );
  }
);

InputGroup.displayName = "InputGroup";
