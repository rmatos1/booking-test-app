import moment from 'moment';
import { icons } from '../../assets';
import {
  Button,
  CloseButton,
  Icon,
  Modal,
  ModalWrapper,
  Overlay,
  RowButtons,
  TopModal,
} from '../../components';
import { IConfirmedBooking } from '../../types';

export interface ICancelBookingModal {
  onClose: () => void;
  bookingData: IConfirmedBooking;
  onCancelBooking: () => void;
}

export const CancelBookingModal = ({
  onClose,
  bookingData,
  onCancelBooking,
}: ICancelBookingModal) => {
  return (
    <ModalWrapper>
      <Overlay onClick={onClose} data-testid="overlay" />

      <Modal>
        <TopModal>
          <CloseButton onClick={onClose} data-testid="close-button">
            X
          </CloseButton>
        </TopModal>

        <Icon src={icons.warning} alt="warning" />

        <h4 data-testid="cancel-modal-title">
          Do you want to cancel this booking from{' '}
          {moment(bookingData.checkIn).format('M/D/YYYY')} to{' '}
          {moment(bookingData.checkOut).format('M/D/YYYY')}?
        </h4>

        <RowButtons $width={250}>
          <Button
            data-testid="deny-button"
            onClick={onClose}
            $backgroundColor="#fff"
            $hideBoxShadow
            $color="#ff3333"
            $borderColor="#ff3333"
          >
            No
          </Button>
          <Button
            $backgroundColor="#ff3333"
            onClick={onCancelBooking}
            data-testid="cancel-booking"
          >
            Yes
          </Button>
        </RowButtons>
      </Modal>
    </ModalWrapper>
  );
};
