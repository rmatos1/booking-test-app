import { describe, test } from "@jest/globals";
import { render } from "@testing-library/react";

import { ResultsList } from "..";
import { TestComponent, ITestComponent } from "../../../components";

const defaultConfirmedBookingsContextValue = {
  confirmedBookings: [],
  setConfirmedBookings: jest.fn(),
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
      <ResultsList />
    </TestComponent>
  );
};

describe("<ResultsList />", () => {
  test("should render no results content without selected dates", () => {
    const wrapper = render(setup({}));

    const noResults = wrapper.getByTestId("no-results-content");

    expect(noResults).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });

  test("should ConfirmYourBooking drawer to be visible", () => {
    const wrapper = render(setup({}));

    const confirmYourBookingTitle = wrapper.getByText("Confirm Your Booking");

    expect(confirmYourBookingTitle).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });
});
