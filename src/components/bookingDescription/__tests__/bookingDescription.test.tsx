import { describe, test } from '@jest/globals';
import { RenderResult, render } from '@testing-library/react';
import moment from 'moment';

import { BookingDescription, IBookingDescription } from '..';
import { testBookingData } from '../../../constants';

const defaultProps: IBookingDescription = {
  data: {
    ...testBookingData
  },
};

const setup = (componentProps?: IBookingDescription): JSX.Element => {
  const baseProps = componentProps || defaultProps;

  return <BookingDescription {...baseProps} />;
};

describe('<BookingDescription />', () => {
  let wrapper: RenderResult;

  beforeEach(() => {
    wrapper = render(setup());
  })

  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render the defined title', () => {
    const TITLE = 'Description';

    wrapper = render(setup({ ...defaultProps, title: TITLE }));

    const title = wrapper.getByText(TITLE);

    expect(title).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });

  test('should render the defined name', () => {
    const name = wrapper.getByTestId('name');

    expect(name.textContent).toContain(defaultProps.data.name);
  });

  test('should render the defined email', () => {
    const email = wrapper.getByTestId('email');

    expect(email.textContent).toContain(defaultProps.data.email);
  });

  test('should render the defined check-in and check-out', () => {
    const period = wrapper.getByTestId('period');

    expect(period.textContent).toContain(
      moment(defaultProps.data.checkIn).format('MM/DD/YYYY')
    );
    expect(period.textContent).toContain(
      moment(defaultProps.data.checkOut).format('MM/DD/YYYY')
    );
  });

  test('should render the number of the defined selected bedroom', () => {
    const bedroomNumber = wrapper.getByTestId('bedroom-number');

    expect(bedroomNumber.textContent).toContain(
      defaultProps.data.selectedBedroom.toString()
    );
  });

  test('should render the defined quantity of guests', () => {
    const qtyGuests = wrapper.getByTestId('qty-guests');

    expect(qtyGuests.textContent).toContain(
      defaultProps.data.qtyGuests.toString()
    );
  });

  test('should render the defined total price', () => {
    const totalPrice = wrapper.getByTestId('total-price');

    expect(totalPrice.textContent).toContain(
      defaultProps.data.totalPrice.toString()
    );
  });
});
