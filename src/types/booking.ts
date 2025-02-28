import { ChangeEvent, FormEvent } from "react";

export interface IBedroom {
  number: number;
  type: string;
  beds: {
    double?: number;
    single?: number;
  };
  img: string;
  fullCapacity: number;
  dailyPrice: number;
}

export interface IBookingData {
  checkIn: string;
  checkOut: string;
  guests: string | number;
  name: string;
  email: string;
  selectedBedroom: number;
}

export type BookingFormDataProps = Pick<
  IBookingData,
  "checkIn" | "checkOut" | "guests"
>;

export interface IConfirmedBooking extends IBookingData {
  id: string;
  totalPrice: number;
}

export interface IUseBookingFormHelper {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isButtonDisabled: boolean;
}

export interface ILimitDates {
  min: string;
  max?: string;
}

export interface ICheckBooking {
  selectedBedroom: number;
  checkIn: string;
  checkOut: string;
}
