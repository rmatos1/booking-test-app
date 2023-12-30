import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';
import { initialBookingData } from '../constants';
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

interface IBookingProvider {
  children: ReactNode;
  customValue?: IBookingContext;
}

export const BookingContext = createContext<IBookingContext>({
  bookingData: initialBookingData,
  setBookingData: () => null,
  idSelectedBooking: '',
  setIdSelectedBooking: () => null,
  isUpdatingBooking: false,
  setIsUpdatingBooking: () => null,
  successfulBooking: false,
  setSuccessfulBooking: () => null,
});

export const BookingProvider = ({ children, customValue }: IBookingProvider) => {
  const [bookingData, setBookingData] =
    useState<IBookingData>(initialBookingData);
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
        ...customValue
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
