import { svg } from '../../assets';
import {
  BookingDescription,
  Button,
  CenteredContentWrapper,
  Image,
  NavBar,
  PageTitle,
  TextWrapper,
} from '../../components';
import { useConfirmedBookingHelper } from './confirmedBookingHelper.hook';

/**
 * page that shows the details of the last confirmed or updated booking
 */
export const ConfirmedBooking = () => {
  const { onNewBookingClick, bookingDescription, isUpdatingBooking } =
    useConfirmedBookingHelper();

  return (
    <>
      <NavBar />

      <CenteredContentWrapper>
        <Image
          imgSrc={bookingDescription ? svg.confirmed : svg.errorApp}
          alt="confirmed image"
        />

        <TextWrapper $maxWidth={400}>
          {bookingDescription ? (
            <>
              <PageTitle data-testid="booking-title">
                {isUpdatingBooking ? 'Updated' : 'Confirmed'} Booking!
              </PageTitle>

              <BookingDescription
                title="Your booking description"
                data={bookingDescription}
              />
            </>
          ) : (
            <p data-testid="empty-booking">
              Sorry, we couldn't identify your booking. However, you can make a
              new one
            </p>
          )}

          <Button $width={280} onClick={onNewBookingClick}>
            New Booking
          </Button>
        </TextWrapper>
      </CenteredContentWrapper>
    </>
  );
};
