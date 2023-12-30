import { describe, test } from '@jest/globals';
import { render, fireEvent } from '@testing-library/react';
import { TestComponent } from '../../../components';
import { testBookingData } from '../../../constants';
import { IConfirmedBookingsContext } from '../../../context';
import moment from "moment"

import { ChangeDatesBookingDrawer } from '..';

const defaultConfirmedBookingsContextValue = {
  confirmedBookings: [],
  setConfirmedBookings: jest.fn(),
}

const defaultProps = {
  bookingData: testBookingData,
};

const setup = (confirmedBookingsContextValue?: IConfirmedBookingsContext): JSX.Element => {
  
  return (
    <TestComponent confirmedBookingsContextValue={confirmedBookingsContextValue || defaultConfirmedBookingsContextValue}>
      <ChangeDatesBookingDrawer {...defaultProps} />
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

    const inputCheckIn = wrapper.getByTestId('input-check-in') as HTMLInputElement;

    expect(inputCheckIn.value).toBe(defaultProps.bookingData.checkIn);
  });

  test('should render the defined check-out value', () => {
    const wrapper = render(setup());

    const inputCheckOut = wrapper.getByTestId('input-check-out') as HTMLInputElement;

    expect(inputCheckOut.value).toBe(defaultProps.bookingData.checkOut);
  });

  test('should call setConfirmedBookings on submit', () => {
    const wrapper = render(setup());

    const checkOutDate = moment(defaultProps.bookingData.checkOut).add(1, 'days').format('YYYY-MM-DD')

    const inputCheckOut = wrapper.getByTestId('input-check-out') as HTMLInputElement;
    fireEvent.change(inputCheckOut, { target: { value: checkOutDate } })

    const changeDatesForm = wrapper.getByTestId("change-dates-form");

    fireEvent.submit(changeDatesForm)

    expect(defaultConfirmedBookingsContextValue.setConfirmedBookings).toHaveBeenCalled()
  });

  test('should render an error message whenever there are dates overlapping on submit', () => {
    const wrapper = render(setup({ ...defaultConfirmedBookingsContextValue, confirmedBookings: [{ ...testBookingData, id: "2" }] }));

    const changeDatesForm = wrapper.getByTestId("change-dates-form");

    fireEvent.submit(changeDatesForm)

    const errorMsg = wrapper.getByTestId("error-msg")

    expect(errorMsg).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });

  test('should render an error message whenever the check-in and check-out are not changed on submit', () => {
    const wrapper = render(setup({ ...defaultConfirmedBookingsContextValue, confirmedBookings: [testBookingData] }));

    const changeDatesForm = wrapper.getByTestId("change-dates-form");

    fireEvent.submit(changeDatesForm)

    const errorMsg = wrapper.getByTestId("error-msg")

    expect(errorMsg).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });
});
