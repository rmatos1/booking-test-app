import { describe, test } from "@jest/globals";
import { RenderResult, fireEvent, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import moment from "moment";

import { BookingForm, IBookingForm } from "..";

const DATE = "2023-12-19";
const GUESTS = 1;

const defaultProps: IBookingForm = {
  onFormSubmit: jest.fn(),
};

const setup = (componentProps?: IBookingForm): JSX.Element => {
  const baseProps = componentProps || defaultProps;

  return (
    <Router>
      <BookingForm {...baseProps} />
    </Router>
  );
};

describe("<BookingForm />", () => {
  let wrapper: RenderResult;

  beforeEach(() => {
    wrapper = render(setup());
  });

  test("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should render the defined title", () => {
    const TITLE = "Booking";

    wrapper = render(setup({ ...defaultProps, title: TITLE }));

    const title = wrapper.getByText(TITLE);

    expect(title).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });

  test("should render the specified date on the check-in input", () => {
    const inputCheckIn = wrapper.getByTestId(
      "input-check-in"
    ) as HTMLInputElement;
    fireEvent.change(inputCheckIn, { target: { value: DATE } });

    expect(inputCheckIn.value).toBe(DATE);
    expect(wrapper).toMatchSnapshot();
  });

  test("should render the specified date on the check-out input", () => {
    const inputCheckOut = wrapper.getByTestId(
      "input-check-out"
    ) as HTMLInputElement;
    fireEvent.change(inputCheckOut, { target: { value: DATE } });

    expect(inputCheckOut.value).toBe(DATE);
    expect(wrapper).toMatchSnapshot();
  });

  test("should render the specified value on the number of guests input", () => {
    const inputQtyGuests = wrapper.getByTestId(
      "input-qty-guests"
    ) as HTMLInputElement;
    fireEvent.change(inputQtyGuests, { target: { value: GUESTS } });

    expect(parseInt(inputQtyGuests.value)).toBe(GUESTS);
    expect(wrapper).toMatchSnapshot();
  });

  test("should display error message when check-in date is before the minimum date", () => {
    const inputCheckIn = wrapper.getByTestId(
      "input-check-in"
    ) as HTMLInputElement;
    const invalidDate = moment().subtract(1, "days").format("YYYY-MM-DD");

    fireEvent.change(inputCheckIn, { target: { value: invalidDate } });
    fireEvent.blur(inputCheckIn);

    const errorMessage = wrapper.getByText("Invalid check-in date");
    expect(errorMessage).toBeDefined();
  });

  test("should display error message when check-out date is before check-in date", () => {
    const inputCheckIn = wrapper.getByTestId(
      "input-check-in"
    ) as HTMLInputElement;
    const inputCheckOut = wrapper.getByTestId(
      "input-check-out"
    ) as HTMLInputElement;

    const checkInDate = moment().add(1, "days").format("YYYY-MM-DD");
    const invalidCheckOutDate = moment(checkInDate)
      .subtract(1, "days")
      .format("YYYY-MM-DD");

    fireEvent.change(inputCheckIn, { target: { value: checkInDate } });
    fireEvent.change(inputCheckOut, { target: { value: invalidCheckOutDate } });
    fireEvent.blur(inputCheckOut);

    const errorMessage = wrapper.getByText("Invalid check-out date");
    expect(errorMessage).toBeDefined();
  });
});
