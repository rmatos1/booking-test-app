import { describe, test } from '@jest/globals';
import { RenderResult, fireEvent, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import moment from 'moment';

import { BookingForm } from '..';
import { IBookingForm } from '../bookingFormHelper.hook';

const DATE = '2023-12-19';
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

describe('<BookingForm />', () => {
  let wrapper: RenderResult;

  beforeEach(() => {
    wrapper = render(setup());
  })

  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render the defined title', () => {
    const TITLE = 'Booking';

    wrapper = render(setup({ ...defaultProps, title: TITLE }));

    const title = wrapper.getByText(TITLE);

    expect(title).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });

  test('should render the specified date on the check-in input', () => {
    const inputCheckIn = wrapper.getByTestId(
      'input-check-in'
    ) as HTMLInputElement;
    fireEvent.change(inputCheckIn, { target: { value: DATE } });

    expect(inputCheckIn.value).toBe(DATE);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render the specified date on the check-out input', () => {
    const inputCheckOut = wrapper.getByTestId(
      'input-check-out'
    ) as HTMLInputElement;
    fireEvent.change(inputCheckOut, { target: { value: DATE } });

    expect(inputCheckOut.value).toBe(DATE);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render the specified value on the number of guests input', () => {
    const inputQtyGuests = wrapper.getByTestId(
      'input-qty-guests'
    ) as HTMLInputElement;
    fireEvent.change(inputQtyGuests, { target: { value: GUESTS } });

    expect(parseInt(inputQtyGuests.value)).toBe(GUESTS);
    expect(wrapper).toMatchSnapshot();
  });

  test("should call onFormSubmit on submit", () => {

    const inputCheckIn = wrapper.getByTestId(
      'input-check-in'
    ) as HTMLInputElement;
    fireEvent.change(inputCheckIn, { target: { value: DATE } });

    const checkOutDate = moment(DATE).add(1, 'days').format('YYYY-MM-DD')

    const inputCheckOut = wrapper.getByTestId(
      'input-check-out'
    ) as HTMLInputElement;
    fireEvent.change(inputCheckOut, { target: { value: checkOutDate } });

    const inputQtyGuests = wrapper.getByTestId(
      'input-qty-guests'
    ) as HTMLInputElement;
    fireEvent.change(inputQtyGuests, { target: { value: GUESTS } });

    const bookingForm = wrapper.getByTestId("booking-form");

    fireEvent.submit(bookingForm);

    expect(defaultProps.onFormSubmit).toHaveBeenCalled()
  })
});
