import { FocusEvent, useState } from 'react';

export interface IUseInputGroupHelperInput {
  validation?: (value: string) => boolean;
  validationErrorMsg?: string;
}

interface IUseInputGroupHelperOutput {
  error: string;
  onFocus: () => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
}

export const useInputGroupHelper = ({
  validation,
  validationErrorMsg,
}: IUseInputGroupHelperInput): IUseInputGroupHelperOutput => {
  const [error, setError] = useState<string>('');

  const handleInputOnFocus = () => {
    setError('');
  };

  const handleInputOnBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { value } = e.target;

    let errorText = '';

    if (!value) {
      errorText = 'Required field';
    } else if (validation && !validation(value)) {
      errorText = validationErrorMsg || '';
    }

    setError(errorText);
  };

  return {
    error,
    onFocus: handleInputOnFocus,
    onBlur: handleInputOnBlur,
  };
};
