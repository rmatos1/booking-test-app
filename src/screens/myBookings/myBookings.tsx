import { svg } from "../../assets";
import {
  BookingDescription,
  Button,
  Form,
  Image,
  ImgContainer,
  InputGroup,
  ListContainer,
  ListItem,
  NavBar,
  RowButtons,
  TwoColumnsGrid,
} from "../../components";
import { ChangeDatesBookingDrawer } from "../../drawers";
import { CancelBookingModal } from "../../modal";
import { useMyBookingsHelper } from "./myBookingsHelper.hook";

export const MyBookings = () => {
  const {
    lastCheckedEmail,
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
    onCloseDrawer,
    register,
    errors,
  } = useMyBookingsHelper();

  return (
    <>
      <NavBar />

      <TwoColumnsGrid>
        <Form onSubmit={onSubmit}>
          <h4>Enter the used email on your bookings</h4>

          <InputGroup
            dataTestId="input-email"
            label="Email"
            type="email"
            {...register("email", { required: true })}
            validationErrorMsg={errors.email?.message}
          />

          <Button
            $isDisabled={isButtonDisabled}
            data-testid="check-my-bookings"
          >
            Check My Bookings
          </Button>
        </Form>

        <ListContainer $isRowOriented>
          {results?.length ? (
            <>
              {results.map((item) => (
                <ListItem
                  key={item.id}
                  $isColumnOriented
                  data-testid="booking-info"
                >
                  <BookingDescription data={item} isLeftAligned />

                  <RowButtons>
                    <Button
                      data-testid="cancel-booking"
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
                      data-testid="update-booking"
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
            <ImgContainer data-testid="no-bookings">
              <Image imgSrc={svg.emptyResults} alt="no results image" />

              <p>
                {results
                  ? `We didn't find any bookings linked to ${lastCheckedEmail}`
                  : "Enter your email to see your bookings"}
              </p>
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

      <ChangeDatesBookingDrawer
        isDrawerVisible={isDrawerVisible}
        onCloseDrawer={onCloseDrawer}
        bookingData={selectedBooking}
      />
    </>
  );
};
