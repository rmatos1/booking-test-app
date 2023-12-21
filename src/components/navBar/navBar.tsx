import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { hideScroll } from '../../helpers';
import { ScreenPaths } from '../../types';
import { StyledLink, TopBar } from './navBar.styles';

interface INavBar {
  backgroundColor?: string;
}

/**
 * navigation bar
 * @param props.backgroundColor - custom color of the navBar
 */

export const NavBar = ({ backgroundColor }: INavBar) => {
  const location = useLocation();

  const myBookings = `/${ScreenPaths.myBookings}`;

  useEffect(() => {
    hideScroll();
  }, []);

  return (
    <TopBar $backgroundColor={backgroundColor}>
      <StyledLink
        to={ScreenPaths.home}
        $isActive={location.pathname === ScreenPaths.home}
      >
        New Booking
      </StyledLink>
      <StyledLink to={myBookings} $isActive={location.pathname === myBookings}>
        My Bookings
      </StyledLink>
    </TopBar>
  );
};
