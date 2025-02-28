import { describe, test } from "@jest/globals";
import { render } from "@testing-library/react";

import { ConfirmedBooking } from "..";
import { IConfirmedBookingsContext } from "../../../context";
import { TestComponent } from "../../../components";

const defaultConfirmedBookingsContextValue = {
  confirmedBookings: [],
  setConfirmedBookings: jest.fn(),
};

const setup = (
  confirmedBookingsContextValue?: IConfirmedBookingsContext
): JSX.Element => {
  return (
    <TestComponent
      confirmedBookingsContextValue={
        confirmedBookingsContextValue || defaultConfirmedBookingsContextValue
      }
    >
      <ConfirmedBooking />
    </TestComponent>
  );
};

describe("<ConfirmedBooking />", () => {
  test("should render an error on not identifying the booking", () => {
    const wrapper = render(setup());

    const emptyBooking = wrapper.getByTestId("empty-booking");

    expect(emptyBooking).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });
});
