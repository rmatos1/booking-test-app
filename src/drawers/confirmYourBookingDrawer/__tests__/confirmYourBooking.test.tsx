import { describe, test } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react';
import { TestComponent } from '../../../components';

import { ConfirmYourBookingDrawer } from '..';

const setup = (): JSX.Element => {
  return (
    <TestComponent>
      <ConfirmYourBookingDrawer />
    </TestComponent>
  );
};

describe('<ConfirmYourBookingDrawer />', () => {
  test('should render correctly', () => {
    const wrapper = render(setup());

    expect(wrapper).toMatchSnapshot();
  });

  test('should render the specified name', () => {
    const NAME = 'test';

    const wrapper = render(setup());

    const inputName = wrapper.getByTestId('input-name') as HTMLInputElement;

    fireEvent.change(inputName, { target: { value: NAME } });

    expect(inputName.value).toBe(NAME);
  });

  test('should render the specified email', () => {
    const EMAIL = 'test@test.com';

    const wrapper = render(setup());

    const inputEmail = wrapper.getByTestId('input-email') as HTMLInputElement;

    fireEvent.change(inputEmail, { target: { value: EMAIL } });

    expect(inputEmail.value).toBe(EMAIL);
  });
});
