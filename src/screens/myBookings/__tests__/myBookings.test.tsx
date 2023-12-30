import { describe, test } from '@jest/globals';
import { render, fireEvent, RenderResult } from "@testing-library/react";

import { MyBookings } from "..";
import { testBookingData, initialBookingData } from '../../../constants';
import { TestComponent, ITestComponent } from '../../../components';

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

const defaultDrawerContextValue = {
    isDrawerVisible: false,
    setIsDrawerVisible: jest.fn(),
}

const testConfirmedBookingsContextValue = { ...defaultConfirmedBookingsContextValue, confirmedBookings: [testBookingData] }

const setup = ({ bookingContextValue, confirmedBookingsContextValue, drawerContextValue } : ITestComponent): JSX.Element => {
  return(
    <TestComponent bookingContextValue={bookingContextValue || defaultBookingContextValue} confirmedBookingsContextValue={confirmedBookingsContextValue || defaultConfirmedBookingsContextValue}
    drawerContextValue={drawerContextValue || defaultDrawerContextValue}>
      <MyBookings />
    </TestComponent>
  )
};

const checkMyBookings = (wrapper: RenderResult) => {
    const emailInput = wrapper.getByTestId('input-email') as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: testBookingData.email } });

    const checkMyBookingsButton = wrapper.getByTestId("check-my-bookings")
    fireEvent.click(checkMyBookingsButton);
}

describe('<MyBookings />', () => {
  test('should render no bookings without enter an email', () => {

    const wrapper = render(setup({}));

    const noBookings = wrapper.getByTestId("no-bookings");

    expect(noBookings).toBeDefined();  
    expect(wrapper).toMatchSnapshot();
  });

  test("should render the bookings that match the entered email", () => {

    const wrapper = render(setup({ confirmedBookingsContextValue: testConfirmedBookingsContextValue }));

    checkMyBookings(wrapper)

    const bookings = wrapper.getAllByTestId("booking-info")

    expect(bookings.length).toBe(testConfirmedBookingsContextValue.confirmedBookings.length);

    expect(wrapper).toMatchSnapshot();
  })

  test("should call setIsDrawerVisible on button click", () => {

    const wrapper = render(setup({ confirmedBookingsContextValue: testConfirmedBookingsContextValue }));

    checkMyBookings(wrapper)

    const bookNow = wrapper.getAllByTestId("update-booking");

    fireEvent.click(bookNow[0])

    expect(defaultDrawerContextValue.setIsDrawerVisible).toHaveBeenCalled()
  })

  test("should ChangeDates drawer to be visible", () => {

    const wrapper = render(setup({ drawerContextValue: { ...defaultDrawerContextValue, isDrawerVisible: true } }));

    const chooseNewDatesTitle = wrapper.getByText("Choose the new dates");

    expect(chooseNewDatesTitle).toBeDefined()
    expect(wrapper).toMatchSnapshot();
  })

  test("should open CancelBooking modal on button click", () => {

    const wrapper = render(setup({ confirmedBookingsContextValue: testConfirmedBookingsContextValue }));

    checkMyBookings(wrapper)

    const cancelBooking = wrapper.getAllByTestId("cancel-booking");

    fireEvent.click(cancelBooking[0])

    const cancelBookingModal = wrapper.getByTestId("cancel-booking-modal");

    expect(cancelBookingModal).toBeDefined()
    expect(wrapper).toMatchSnapshot();
  })
});
