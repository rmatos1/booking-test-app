import { describe, test } from '@jest/globals';
import { render } from '@testing-library/react';
import { TestComponent } from '../../../components';
import { TEST_BOOKING_DATA } from '../../../constants';
import { IConfirmedBooking } from '../../../types';

import { ChangeDatesBookingDrawer } from '..';

const defaultProps = {
  bookingData: TEST_BOOKING_DATA,
};

const setup = (componentProps?: {
  bookingData: IConfirmedBooking;
}): JSX.Element => {
  const baseProps = componentProps || defaultProps;

  return (
    <TestComponent>
      <ChangeDatesBookingDrawer {...baseProps} />
    </TestComponent>
  );
};

describe('<ChangeDatesBookingDrawer />', () => {
  test('should render correctly', () => {
    const wrapper = render(setup());

    expect(wrapper).toMatchSnapshot();
  });

  test('should render the defined check-in value', () => {
    const wrapper = render(setup());

    const inputCheckIn = wrapper.getByTestId(
      'input-check-in'
    ) as HTMLInputElement;

    expect(inputCheckIn.value).toBe(defaultProps.bookingData.checkIn);
  });

  test('should render the defined check-out value', () => {
    const wrapper = render(setup());

    const inputCheckOut = wrapper.getByTestId(
      'input-check-out'
    ) as HTMLInputElement;

    expect(inputCheckOut.value).toBe(defaultProps.bookingData.checkOut);
  });
});
