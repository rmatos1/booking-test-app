import { ChangeEvent, FormEvent } from 'react';

export interface IBookingData {
  checkIn: string;
  checkOut: string;
  qtyGuests: string | number;
  name: string;
  email: string;
  selectedBedroom: number;
}

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
