import { describe, test } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react';

import { ReactNode } from 'react';
import { ConfirmedBookingsContext, IConfirmedBookingsContext } from '..';
import { TestComponent } from '../../components';
import { testBookingData } from '../../constants';

const testElement: ReactNode = <div data-testid="test-element" />;

const testConsumerContext = (
  children: (value: IConfirmedBookingsContext) => ReactNode
) => {
  return (
    <ConfirmedBookingsContext.Consumer>
      {children}
    </ConfirmedBookingsContext.Consumer>
  );
};

const setup = (children: ReactNode): JSX.Element => {
  return <TestComponent>{children}</TestComponent>;
};

describe('<ConfirmedBookingsProvider />', () => {
  test('should render the defined children element correctly', () => {
    const wrapper = render(setup(testElement));

    const children = wrapper.getByTestId('test-element');

    expect(children).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });

  test('should render the specified bookings correctly after the click', () => {
    const context = testConsumerContext((value) => (
      <button
        onClick={() =>
          value.setConfirmedBookings((prevData) => [
            ...prevData,
            testBookingData
          ])
        }
        data-testid="booking-button"
      >
        {JSON.stringify(value.confirmedBookings)}
      </button>
    ));

    const wrapper = render(setup(context));

    const bookingButton = wrapper.getByTestId('booking-button');

    expect(bookingButton.textContent).toBe(`[]`);

    fireEvent.click(bookingButton);

    expect(bookingButton.textContent).toBe(
      `[${JSON.stringify(testBookingData)}]`
    );
    expect(wrapper).toMatchSnapshot();
  });
});
