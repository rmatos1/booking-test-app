import { describe, test } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

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
  test('should render correctly', () => {
    const wrapper = render(setup());

    expect(wrapper).toMatchSnapshot();
  });

  test('should render the defined title', () => {
    const TITLE = 'Booking';

    const wrapper = render(setup({ ...defaultProps, title: TITLE }));

    const title = wrapper.getByText(TITLE);

    expect(title).toBeDefined();
  });

  test('should render the specified date on the check-in input', () => {
    const wrapper = render(setup());

    const inputCheckIn = wrapper.getByTestId(
      'input-check-in'
    ) as HTMLInputElement;
    fireEvent.change(inputCheckIn, { target: { value: DATE } });

    expect(inputCheckIn.value).toBe(DATE);
  });

  test('should render the specified date on the check-out input', () => {
    const wrapper = render(setup());

    const inputCheckOut = wrapper.getByTestId(
      'input-check-out'
    ) as HTMLInputElement;
    fireEvent.change(inputCheckOut, { target: { value: DATE } });

    expect(inputCheckOut.value).toBe(DATE);
  });

  test('should render the specified value on the number of guests input', () => {
    const wrapper = render(setup());

    const inputQtyGuests = wrapper.getByTestId(
      'input-qty-guests'
    ) as HTMLInputElement;
    fireEvent.change(inputQtyGuests, { target: { value: GUESTS } });

    expect(parseInt(inputQtyGuests.value)).toBe(GUESTS);
  });
});
