import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';
import { IConfirmedBooking } from '../types';

export interface IConfirmedBookingsContext {
  confirmedBookings: IConfirmedBooking[];
  setConfirmedBookings: Dispatch<SetStateAction<IConfirmedBooking[]>>;
}

interface IConfirmedBookingsProvider {
  children: ReactNode;
  customValue?: IConfirmedBookingsContext;
}

export const ConfirmedBookingsContext =
  createContext<IConfirmedBookingsContext>({
    confirmedBookings: [],
    setConfirmedBookings: () => null,
  });

export const ConfirmedBookingsProvider = ({
  children, customValue
}: IConfirmedBookingsProvider) => {
  const [confirmedBookings, setConfirmedBookings] = useState<
    IConfirmedBooking[]
  >([]);

  return (
    <ConfirmedBookingsContext.Provider
      value={{
        confirmedBookings,
        setConfirmedBookings,
        ...customValue 
      }}
    >
      {children}
    </ConfirmedBookingsContext.Provider>
  );
};
