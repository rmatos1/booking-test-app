import { describe, test } from '@jest/globals';
import { render, fireEvent } from "@testing-library/react";

import { ResultsList } from "..";
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

const testBookingContextValue = { ...defaultBookingContextValue, bookingData: testBookingData };

const testConfirmedBookingsContextValue = { ...defaultConfirmedBookingsContextValue, confirmedBookings: [testBookingData] }

const setup = ({ bookingContextValue, confirmedBookingsContextValue, drawerContextValue } : ITestComponent): JSX.Element => {
  return(
    <TestComponent bookingContextValue={bookingContextValue || defaultBookingContextValue} confirmedBookingsContextValue={confirmedBookingsContextValue || defaultConfirmedBookingsContextValue}
    drawerContextValue={drawerContextValue || defaultDrawerContextValue}>
      <ResultsList />
    </TestComponent>
  )
};

describe('<ResultsList />', () => {
  test('should render no results content without selected dates', () => {

    const wrapper = render(setup({}));

    const noResults = wrapper.getByTestId("no-results-content");

    expect(noResults).toBeDefined();  
    expect(wrapper).toMatchSnapshot();
  });

  test("should render the list with all bedrooms that match the defined search criteria", () => {

    const wrapper = render(setup({ bookingContextValue: testBookingContextValue }));

    const bedrooms = wrapper.getAllByTestId("bedroom-info")

    expect(bedrooms.length).toBe(3);

    expect(wrapper).toMatchSnapshot();
  })

  test("should render the list with the available bedrooms that match the defined search criteria", () => {

    const wrapper = render(setup({ bookingContextValue: testBookingContextValue, confirmedBookingsContextValue: testConfirmedBookingsContextValue }));

    const bedrooms = wrapper.getAllByTestId("bedroom-info")

    expect(bedrooms.length).toBe(2);

    expect(wrapper).toMatchSnapshot();
  })

  test("should call setIsDrawerVisible on button click", () => {

    const wrapper = render(setup({ bookingContextValue: testBookingContextValue, confirmedBookingsContextValue: testConfirmedBookingsContextValue }));

    const bookNow = wrapper.getAllByTestId("book-now");

    fireEvent.click(bookNow[0])

    expect(defaultDrawerContextValue.setIsDrawerVisible).toHaveBeenCalled()
  })

  test("should ConfirmYourBooking drawer to be visible", () => {

    const wrapper = render(setup({ drawerContextValue: { ...defaultDrawerContextValue, isDrawerVisible: true } }));

    const confirmYourBookingTitle = wrapper.getByText("Confirm Your Booking");

    expect(confirmYourBookingTitle).toBeDefined()
    expect(wrapper).toMatchSnapshot();
  })
});
