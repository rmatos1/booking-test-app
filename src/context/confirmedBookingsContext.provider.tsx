import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
  useEffect,
} from "react";
import { IConfirmedBooking } from "../types";

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
  children,
  customValue,
}: IConfirmedBookingsProvider) => {
  const [confirmedBookings, setConfirmedBookings] = useState<
    IConfirmedBooking[]
  >(() => {
    const savedBookings = sessionStorage.getItem("confirmedBookings");
    return savedBookings ? JSON.parse(savedBookings) : [];
  });

  useEffect(() => {
    sessionStorage.setItem(
      "confirmedBookings",
      JSON.stringify(confirmedBookings)
    );
  }, [confirmedBookings]);

  return (
    <ConfirmedBookingsContext.Provider
      value={{
        confirmedBookings,
        setConfirmedBookings,
        ...customValue,
      }}
    >
      {children}
    </ConfirmedBookingsContext.Provider>
  );
};
