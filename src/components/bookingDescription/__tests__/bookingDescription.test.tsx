import { describe, test } from '@jest/globals';
import { render } from '@testing-library/react';
import moment from 'moment';

import { BookingDescription, IBookingDescription } from '..';
import { TEST_BOOKING_DATA } from '../../../constants';

const defaultProps: IBookingDescription = {
  data: {
    ...TEST_BOOKING_DATA,
  },
};

const setup = (componentProps?: IBookingDescription): JSX.Element => {
  const baseProps = componentProps || defaultProps;

  return <BookingDescription {...baseProps} />;
};

describe('<BookingDescription />', () => {
  test('should render correctly', () => {
    const wrapper = render(setup());

    expect(wrapper).toMatchSnapshot();
  });

  test('should render the defined title', () => {
    const TITLE = 'Description';

    const wrapper = render(setup({ ...defaultProps, title: TITLE }));

    const title = wrapper.getByText(TITLE);

    expect(title).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });

  test('should render the defined name', () => {
    const wrapper = render(setup());

    const name = wrapper.getByTestId('name');

    expect(name.textContent).toContain(defaultProps.data.name);
  });

  test('should render the defined email', () => {
    const wrapper = render(setup());

    const email = wrapper.getByTestId('email');

    expect(email.textContent).toContain(defaultProps.data.email);
  });

  test('should render the defined check-in and check-out', () => {
    const wrapper = render(setup());

    const period = wrapper.getByTestId('period');

    expect(period.textContent).toContain(
      moment(defaultProps.data.checkIn).format('MM/DD/YYYY')
    );
    expect(period.textContent).toContain(
      moment(defaultProps.data.checkOut).format('MM/DD/YYYY')
    );
  });

  test('should render the number of the defined selected bedroom', () => {
    const wrapper = render(setup());

    const bedroomNumber = wrapper.getByTestId('bedroom-number');

    expect(bedroomNumber.textContent).toContain(
      defaultProps.data.selectedBedroom.toString()
    );
  });

  test('should render the defined quantity of guests', () => {
    const wrapper = render(setup());

    const qtyGuests = wrapper.getByTestId('qty-guests');

    expect(qtyGuests.textContent).toContain(
      defaultProps.data.qtyGuests.toString()
    );
  });

  test('should render the defined total price', () => {
    const wrapper = render(setup());

    const totalPrice = wrapper.getByTestId('total-price');

    expect(totalPrice.textContent).toContain(
      defaultProps.data.totalPrice.toString()
    );
  });
});
