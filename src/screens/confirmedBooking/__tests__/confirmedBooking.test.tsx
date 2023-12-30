import { describe, test } from '@jest/globals';
import { render } from "@testing-library/react";

import { ConfirmedBooking } from "..";
import { IBookingContext, IConfirmedBookingsContext } from '../../../context';
import { testBookingData, initialBookingData } from '../../../constants';
import { TestComponent } from '../../../components';

const defaultBookingContextValue = {
  bookingData: initialBookingData,
  setBookingData: jest.fn(),
  idSelectedBooking: '',
  setIdSelectedBooking: jest.fn(),
  isUpdatingBooking: false,
  setIsUpdatingBooking: jest.fn(),
  successfulBooking: false,
  setSuccessfulBooking: jest.fn(),
}

const defaultConfirmedBookingsContextValue = {
  confirmedBookings: [],
  setConfirmedBookings: jest.fn(),
}

const testBookingContextValue = { ...defaultBookingContextValue, bookingData: testBookingData, idSelectedBooking: testBookingData.id, successfulBooking: true };

const testConfirmedBookingsContextValue = { ...defaultConfirmedBookingsContextValue, confirmedBookings: [testBookingData] }

const setup = (bookingContextValue?: IBookingContext, confirmedBookingsContextValue?: IConfirmedBookingsContext): JSX.Element => {
  return(
    <TestComponent bookingContextValue={bookingContextValue || defaultBookingContextValue} confirmedBookingsContextValue={confirmedBookingsContextValue || defaultConfirmedBookingsContextValue}>
      <ConfirmedBooking />
    </TestComponent>
  )
};

describe('<ConfirmedBooking />', () => {
  test('should render an error on not identifying the booking', () => {

    const wrapper = render(setup());

    const emptyBooking = wrapper.getByTestId("empty-booking");

    expect(emptyBooking).toBeDefined();  
    expect(wrapper).toMatchSnapshot();
  });

  test("should render the defined booking description", () => {

    const wrapper = render(setup(testBookingContextValue, testConfirmedBookingsContextValue));

    const title = wrapper.getByTestId("booking-title")

    expect(title.textContent).toContain("Confirmed");

    const name = wrapper.getByTestId("name")

    expect(name).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  })

  test("should render the updated booking title", () => {

    const wrapper = render(setup({ ...testBookingContextValue, isUpdatingBooking: true }, testConfirmedBookingsContextValue));

    const title = wrapper.getByTestId("booking-title")

    expect(title.textContent).toContain("Updated");

    expect(wrapper).toMatchSnapshot();
  })
});
