import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';
import { INITIAL_BOOKING_DATA } from '../constants';
import { IBookingData } from '../types';

export interface IBookingContext {
  bookingData: IBookingData;
  setBookingData: Dispatch<SetStateAction<IBookingData>>;
  idSelectedBooking: string;
  setIdSelectedBooking: Dispatch<SetStateAction<string>>;
  isUpdatingBooking: boolean;
  setIsUpdatingBooking: Dispatch<SetStateAction<boolean>>;
  successfulBooking: boolean;
  setSuccessfulBooking: Dispatch<SetStateAction<boolean>>;
}

export const BookingContext = createContext<IBookingContext>({
  bookingData: INITIAL_BOOKING_DATA,
  setBookingData: () => null,
  idSelectedBooking: '',
  setIdSelectedBooking: () => null,
  isUpdatingBooking: false,
  setIsUpdatingBooking: () => null,
  successfulBooking: false,
  setSuccessfulBooking: () => null,
});

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookingData, setBookingData] =
    useState<IBookingData>(INITIAL_BOOKING_DATA);
  const [idSelectedBooking, setIdSelectedBooking] = useState<string>('');
  const [isUpdatingBooking, setIsUpdatingBooking] = useState<boolean>(false);
  const [successfulBooking, setSuccessfulBooking] = useState<boolean>(false);

  return (
    <BookingContext.Provider
      value={{
        bookingData,
        setBookingData,
        idSelectedBooking,
        setIdSelectedBooking,
        isUpdatingBooking,
        setIsUpdatingBooking,
        successfulBooking,
        setSuccessfulBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
