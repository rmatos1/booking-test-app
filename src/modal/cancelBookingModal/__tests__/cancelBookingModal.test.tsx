import { describe, test } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react';
import moment from 'moment';
import { TestComponent } from '../../../components';
import { testBookingData } from '../../../constants';

import { CancelBookingModal } from '..';

const defaultProps = {
  onClose: jest.fn(),
  bookingData: testBookingData,
  onCancelBooking: jest.fn(),
};

const setup = (): JSX.Element => {
  return (
    <TestComponent>
      <CancelBookingModal {...defaultProps} />
    </TestComponent>
  );
};

describe('<CancelBookingModal />', () => {
  test('should render correctly', () => {
    const wrapper = render(setup());

    expect(wrapper).toMatchSnapshot();
  });

  test('should call onClose on click', () => {
    const wrapper = render(setup());

    const overlay = wrapper.getByTestId('overlay');
    fireEvent.click(overlay);

    expect(defaultProps.onClose).toHaveBeenCalled();

    const closeButton = wrapper.getByTestId('close-button');
    fireEvent.click(closeButton);

    expect(defaultProps.onClose).toHaveBeenCalled();

    const denyButton = wrapper.getByTestId('deny-button');
    fireEvent.click(denyButton);

    expect(defaultProps.onClose).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });

  test('should render the defined check-in and check-out', () => {
    const wrapper = render(setup());

    const modalTitle = wrapper.getByTestId('cancel-modal-title');

    expect(modalTitle.textContent).toContain(
      moment(defaultProps.bookingData.checkIn).format('MM/DD/YYYY')
    );
    expect(modalTitle.textContent).toContain(
      moment(defaultProps.bookingData.checkOut).format('MM/DD/YYYY')
    );
  });

  test('should call onCancelBooking on click', () => {
    const wrapper = render(setup());

    const cancelBooking = wrapper.getByTestId('cancel-booking');
    fireEvent.click(cancelBooking);

    expect(defaultProps.onCancelBooking).toHaveBeenCalled();
  });
});
