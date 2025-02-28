import { describe, test } from "@jest/globals";
import { fireEvent, render, RenderResult } from "@testing-library/react";
import { TestComponent } from "../../../components";

import { ConfirmYourBookingDrawer } from "..";

const NAME = "test";
const EMAIL = "test@test.com";

const defaultConfirmedBookingsContextValue = {
  confirmedBookings: [],
  setConfirmedBookings: jest.fn(),
};

const defaultProps = {
  selectedBedroom: 2,
  isDrawerVisible: true,
  onCloseDrawer: jest.fn(),
};

const setup = (): JSX.Element => {
  return (
    <TestComponent
      confirmedBookingsContextValue={defaultConfirmedBookingsContextValue}
    >
      <ConfirmYourBookingDrawer {...defaultProps} />
    </TestComponent>
  );
};

describe("<ConfirmYourBookingDrawer />", () => {
  let wrapper: RenderResult;

  beforeEach(() => {
    wrapper = render(setup());
  });

  test("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should render the specified name", () => {
    const inputName = wrapper.getByTestId("input-name") as HTMLInputElement;

    fireEvent.change(inputName, { target: { value: NAME } });

    expect(inputName.value).toBe(NAME);
    expect(wrapper).toMatchSnapshot();
  });

  test("should render the specified email", () => {
    const inputEmail = wrapper.getByTestId("input-email") as HTMLInputElement;

    fireEvent.change(inputEmail, { target: { value: EMAIL } });

    expect(inputEmail.value).toBe(EMAIL);
    expect(wrapper).toMatchSnapshot();
  });

  test("should call setConfirmedBookings on submit", () => {
    const inputName = wrapper.getByTestId("input-name") as HTMLInputElement;

    fireEvent.change(inputName, { target: { value: NAME } });

    const inputEmail = wrapper.getByTestId("input-email") as HTMLInputElement;

    fireEvent.change(inputEmail, { target: { value: EMAIL } });

    const confirmYourBookingForm = wrapper.getByTestId(
      "confirm-your-booking-form"
    );

    fireEvent.submit(confirmYourBookingForm);

    expect(
      defaultConfirmedBookingsContextValue.setConfirmedBookings
    ).toHaveBeenCalled();
  });
});
