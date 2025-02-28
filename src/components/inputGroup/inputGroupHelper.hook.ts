import { FocusEvent, useState } from "react";

export interface IUseInputGroupHelperInput {
  validationErrorMsg?: string;
}

interface IUseInputGroupHelperOutput {
  error: string;
  onFocus: () => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
}

export const useInputGroupHelper = ({
  validationErrorMsg,
}: IUseInputGroupHelperInput): IUseInputGroupHelperOutput => {
  const [error, setError] = useState<string>("");

  const handleInputOnFocus = () => {
    setError("");
  };

  const handleInputOnBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { value } = e.target;

    let errorText = "";

    if (!value) {
      errorText = "Required field";
    } else if (validationErrorMsg) {
      errorText = validationErrorMsg;
    }

    setError(errorText);
  };

  return {
    error,
    onFocus: handleInputOnFocus,
    onBlur: handleInputOnBlur,
  };
};
