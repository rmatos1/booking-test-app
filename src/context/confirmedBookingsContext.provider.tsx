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

export const ConfirmedBookingsContext =
  createContext<IConfirmedBookingsContext>({
    confirmedBookings: [],
    setConfirmedBookings: () => null,
  });

export const ConfirmedBookingsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [confirmedBookings, setConfirmedBookings] = useState<
    IConfirmedBooking[]
  >([]);

  return (
    <ConfirmedBookingsContext.Provider
      value={{
        confirmedBookings,
        setConfirmedBookings,
      }}
    >
      {children}
    </ConfirmedBookingsContext.Provider>
  );
};
