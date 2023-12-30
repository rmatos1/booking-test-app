import { BrowserRouter as Router } from 'react-router-dom';
import {
  BookingProvider,
  ConfirmedBookingsProvider,
  DrawerProvider,
  IBookingContext,
  IConfirmedBookingsContext,
  IDrawerContext
} from '../../context';
import { IComponentWithChildren } from '../../types';

export interface ITestComponent extends IComponentWithChildren {
  bookingContextValue?: IBookingContext;
  confirmedBookingsContextValue?: IConfirmedBookingsContext;
  drawerContextValue?: IDrawerContext;
}

/**
 * component to be used only in the tests
 * @param props.children - component to be rendered
 */
export const TestComponent = ({ children, bookingContextValue, confirmedBookingsContextValue, drawerContextValue }: ITestComponent) => {
  return (
    <BookingProvider customValue={bookingContextValue}>
      <ConfirmedBookingsProvider customValue={confirmedBookingsContextValue}>
        <DrawerProvider customValue={drawerContextValue}>
          <Router>{children}</Router>
        </DrawerProvider>
      </ConfirmedBookingsProvider>
    </BookingProvider>
  );
};
