import { describe, test } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react';

import { InputEmail, TInputEmail } from '..';

const defaultProps: TInputEmail = {
  value: 'test@test.com',
  onChange: jest.fn(),
};

const setup = (): JSX.Element => {
  return <InputEmail {...defaultProps} />;
};

describe('<InputEmail />', () => {
  test('should render correctly', () => {
    const wrapper = render(setup());

    expect(wrapper).toMatchSnapshot();
  });

  test('should render the specified email', () => {
    const wrapper = render(setup());

    const inputEmail = wrapper.getByTestId('input-email') as HTMLInputElement;

    expect(inputEmail.value).toBe(defaultProps.value);
  });

  test('should call onChange', () => {
    const wrapper = render(setup());

    const inputEmail = wrapper.getByTestId('input-email') as HTMLInputElement;
    fireEvent.change(inputEmail, { target: { value: '' } });

    expect(defaultProps.onChange).toHaveBeenCalled();
  });
});
