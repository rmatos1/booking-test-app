import { describe, test } from "@jest/globals";
import { render, fireEvent, RenderResult } from "@testing-library/react";

import { MyBookings } from "..";
import { testBookingData } from "../../../constants";
import { TestComponent, ITestComponent } from "../../../components";

const defaultConfirmedBookingsContextValue = {
  confirmedBookings: [],
  setConfirmedBookings: jest.fn(),
};

const testConfirmedBookingsContextValue = {
  ...defaultConfirmedBookingsContextValue,
  confirmedBookings: [testBookingData],
};

const setup = ({
  confirmedBookingsContextValue,
}: ITestComponent): JSX.Element => {
  return (
    <TestComponent
      confirmedBookingsContextValue={
        confirmedBookingsContextValue || defaultConfirmedBookingsContextValue
      }
    >
      <MyBookings />
    </TestComponent>
  );
};

const checkMyBookings = (wrapper: RenderResult) => {
  const emailInput = wrapper.getByTestId("input-email") as HTMLInputElement;
  fireEvent.change(emailInput, { target: { value: testBookingData.email } });

  const checkMyBookingsButton = wrapper.getByTestId("check-my-bookings");
  fireEvent.click(checkMyBookingsButton);
};

describe("<MyBookings />", () => {
  test("should render no bookings without enter an email", () => {
    const wrapper = render(setup({}));

    const noBookings = wrapper.getByTestId("no-bookings");

    expect(noBookings).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });

  test("should render the bookings that match the entered email", () => {
    const wrapper = render(
      setup({
        confirmedBookingsContextValue: testConfirmedBookingsContextValue,
      })
    );

    checkMyBookings(wrapper);

    const bookings = wrapper.getAllByTestId("booking-info");

    expect(bookings.length).toBe(
      testConfirmedBookingsContextValue.confirmedBookings.length
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("should ChangeDates drawer to be visible", () => {
    const wrapper = render(setup({}));

    const chooseNewDatesTitle = wrapper.getByText("Choose the new dates");

    expect(chooseNewDatesTitle).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });

  test("should open CancelBooking modal on button click", () => {
    const wrapper = render(
      setup({
        confirmedBookingsContextValue: testConfirmedBookingsContextValue,
      })
    );

    checkMyBookings(wrapper);

    const cancelBooking = wrapper.getAllByTestId("cancel-booking");

    fireEvent.click(cancelBooking[0]);

    const cancelBookingModal = wrapper.getByTestId("cancel-booking-modal");

    expect(cancelBookingModal).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });
});
