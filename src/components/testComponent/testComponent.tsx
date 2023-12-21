import { BrowserRouter as Router } from 'react-router-dom';
import {
  BookingProvider,
  ConfirmedBookingsProvider,
  DrawerProvider,
} from '../../context';
import { IComponentWithChildren } from '../../types';

/**
 * component to be used only in the tests
 * @param props.children - component to be rendered
 */
export const TestComponent = ({ children }: IComponentWithChildren) => {
  return (
    <BookingProvider>
      <ConfirmedBookingsProvider>
        <DrawerProvider>
          <Router>{children}</Router>
        </DrawerProvider>
      </ConfirmedBookingsProvider>
    </BookingProvider>
  );
};
