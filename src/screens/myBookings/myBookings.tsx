import { svg } from '../../assets';
import {
  BookingDescription,
  Button,
  Form,
  Image,
  ImgContainer,
  InputEmail,
  ListContainer,
  ListItem,
  NavBar,
  RowButtons,
  TwoColumnsGrid,
} from '../../components';
import { ChangeDatesBookingDrawer } from '../../drawers';
import { CancelBookingModal } from '../../modal';
import { useMyBookingsHelper } from './myBookingHelper.hook';

export const MyBookings = () => {
  const {
    email,
    onChange,
    isButtonDisabled,
    results,
    onSubmit,
    onOpenDrawer,
    showModal,
    onCloseModal,
    selectedBooking,
    onOpenModal,
    onCancelBooking,
    isDrawerVisible,
  } = useMyBookingsHelper();

  return (
    <>
      <NavBar />

      <TwoColumnsGrid>
        <Form onSubmit={onSubmit}>
          <h4>Enter the used email on your bookings</h4>

          <InputEmail value={email} onChange={onChange} />

          <Button $isDisabled={isButtonDisabled}>Check My Bookings</Button>
        </Form>

        <ListContainer $isRowOriented>
          {results.length ? (
            <>
              {results.map((item) => (
                <ListItem key={item.id} $isColumnOriented>
                  <BookingDescription data={item} isLeftAligned />

                  <RowButtons>
                    <Button
                      $height={40}
                      $fontSize={14}
                      $backgroundColor="#fff"
                      $hideBoxShadow
                      $color="#ff3333"
                      $borderColor="#ff3333"
                      onClick={() => onOpenModal(item)}
                    >
                      Cancel
                    </Button>
                    <Button
                      $height={40}
                      $fontSize={14}
                      $backgroundColor="rgb(245, 172, 36)"
                      onClick={() => onOpenDrawer(item)}
                    >
                      New Dates
                    </Button>
                  </RowButtons>
                </ListItem>
              ))}
            </>
          ) : (
            <ImgContainer>
              <Image src={svg.emptyResults} alt="no results image" />

              <p>We didn't find any bookings linked to this email</p>
            </ImgContainer>
          )}
        </ListContainer>
      </TwoColumnsGrid>

      {showModal && (
        <CancelBookingModal
          onClose={onCloseModal}
          bookingData={selectedBooking}
          onCancelBooking={onCancelBooking}
        />
      )}

      {isDrawerVisible && (
        <ChangeDatesBookingDrawer bookingData={selectedBooking} />
      )}
    </>
  );
};
