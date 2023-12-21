import { svg } from '../../../assets';
import {
  CenteredContentWrapper,
  Image,
  NavBar,
  PageTitle,
  RowButtons,
  StyledLink,
  TextWrapper,
} from '../../../components';
import { ScreenPaths } from '../../../types';

export const NotFound = () => {
  return (
    <>
      <NavBar />

      <CenteredContentWrapper>
        <Image imgSrc={svg.pageNotFound} alt="not found" />

        <TextWrapper $maxWidth={400}>
          <PageTitle>Page not found!</PageTitle>

          <p>
            Sorry, it looks like you've lost the path. But we can offer you a
            little help with some links!
          </p>

          <RowButtons>
            <StyledLink to={ScreenPaths.home}>New Booking</StyledLink>
            <StyledLink to={ScreenPaths.myBookings}>My Bookings</StyledLink>
          </RowButtons>
        </TextWrapper>
      </CenteredContentWrapper>
    </>
  );
};
