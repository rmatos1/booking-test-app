import { describe, test } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react';

import { ReactNode } from 'react';
import { TestComponent } from '../../components';
import { initialBookingData, testBookingData } from '../../constants';

import { BookingContext, IBookingContext } from '..';

const testElement: ReactNode = <div data-testid="test-element" />;

const testConsumerContext = (
  children: (value: IBookingContext) => ReactNode
) => {
  return <BookingContext.Consumer>{children}</BookingContext.Consumer>;
};

const setup = (children: ReactNode): JSX.Element => {
  return <TestComponent>{children}</TestComponent>;
};

describe('<BookingProvider />', () => {
  test('should render the defined children element correctly', () => {
    const wrapper = render(setup(testElement));

    const children = wrapper.getByTestId('test-element');

    expect(children).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });

  test('should render the initial booking data correctly', () => {
    const context = testConsumerContext((value) => (
      <span data-testid="booking-data">
        {JSON.stringify(value.bookingData)}
      </span>
    ));

    const wrapper = render(setup(context));

    const bookingData = wrapper.getByTestId('booking-data');

    expect(bookingData.textContent).toBe(JSON.stringify(initialBookingData));
    expect(wrapper).toMatchSnapshot();
  });

  test('should render the specified booking data after the click', () => {
    const context = testConsumerContext((value) => (
      <button
        onClick={() => value.setBookingData(testBookingData)}
        data-testid="booking-button"
      >
        {JSON.stringify(value.bookingData)}
      </button>
    ));

    const wrapper = render(setup(context));

    const bookingButton = wrapper.getByTestId('booking-button');
    fireEvent.click(bookingButton);

    expect(bookingButton.textContent).toBe(JSON.stringify(testBookingData));
    expect(wrapper).toMatchSnapshot();
  });

  test('should render the specified id after the click', () => {
    const TEST_ID = 'test-id';

    const context = testConsumerContext((value) => (
      <button
        onClick={() => value.setIdSelectedBooking(TEST_ID)}
        data-testid="booking-button"
      >
        {value.idSelectedBooking}
      </button>
    ));

    const wrapper = render(setup(context));

    const bookingButton = wrapper.getByTestId('booking-button');

    expect(bookingButton.textContent).toBe("");

    fireEvent.click(bookingButton);

    expect(bookingButton.textContent).toBe(TEST_ID);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render the specified element if the booking was updated correctly', () => {
    const context = testConsumerContext((value) => (
      <>
        <button
          onClick={() => value.setIsUpdatingBooking(true)}
          data-testid="booking-button"
        ></button>

        {value.isUpdatingBooking && <div data-testid="test-element" />}
      </>
    ));

    const wrapper = render(setup(context));

    const testElementNotVisible = wrapper.queryByTestId('test-element');  

    expect(testElementNotVisible).toBeNull();

    const bookingButton = wrapper.getByTestId('booking-button');
    
    fireEvent.click(bookingButton);

    const testElementVisible = wrapper.getByTestId('test-element');

    expect(testElementVisible).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });

  test('should render the specified element if a booking was created or updated', () => {
    const context = testConsumerContext((value) => (
      <>
        <button
          onClick={() => value.setSuccessfulBooking(true)}
          data-testid="booking-button"
        ></button>

        {value.successfulBooking && <div data-testid="test-element" />}
      </>
    ));

    const wrapper = render(setup(context));

    const testElementNotVisible = wrapper.queryByTestId('test-element');  

    expect(testElementNotVisible).toBeNull();
    
    const bookingButton = wrapper.getByTestId('booking-button');
    fireEvent.click(bookingButton);

    const testElementVisible = wrapper.getByTestId('test-element');

    expect(testElementVisible).toBeDefined();

    expect(testElement).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });
});
