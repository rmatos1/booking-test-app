import { describe, test } from "@jest/globals";
import { renderHook } from "@testing-library/react";
import { TestComponent, ITestComponent } from "../../components";
import { testBookingData } from "../../constants";

import { useBooking } from "..";

const defaultConfirmedBookingsContextValue = {
  confirmedBookings: [],
  setConfirmedBookings: jest.fn(),
};

describe("useBooking.ts > checkBookingsOverlap", () => {
  test("should return an empty array", () => {
    const wrapper = ({ children }: ITestComponent) => (
      <TestComponent
        confirmedBookingsContextValue={defaultConfirmedBookingsContextValue}
      >
        {children}
      </TestComponent>
    );

    const { result } = renderHook(() => useBooking(), { wrapper });

    const overlappedBookings = result.current.checkBookingsOverlap({
      selectedBedroom: 1,
      checkIn: "2023-12-31",
      checkOut: "2024-01-02",
    });

    expect(overlappedBookings).toHaveLength(0);
  });

  test("should return an array with one element", () => {
    const wrapper = ({ children }: ITestComponent) => (
      <TestComponent
        confirmedBookingsContextValue={{
          ...defaultConfirmedBookingsContextValue,
          confirmedBookings: [testBookingData],
        }}
      >
        {children}
      </TestComponent>
    );

    const { result } = renderHook(() => useBooking(), { wrapper });

    const overlappedBookings = result.current.checkBookingsOverlap({
      selectedBedroom: testBookingData.selectedBedroom,
      checkIn: testBookingData.checkIn,
      checkOut: testBookingData.checkOut,
    });

    expect(overlappedBookings).toHaveLength(1);
  });
});

describe("useBooking.ts > confirmBooking", () => {
  const wrapper = ({ children }: ITestComponent) => (
    <TestComponent
      confirmedBookingsContextValue={defaultConfirmedBookingsContextValue}
    >
      {children}
    </TestComponent>
  );

  const { result } = renderHook(() => useBooking(), { wrapper });

  const booking = {
    bookings: [testBookingData],
    id: "1",
    isUpdatingBooking: true,
  };

  result.current.confirmBooking(booking);

  expect(
    defaultConfirmedBookingsContextValue.setConfirmedBookings
  ).toHaveBeenCalled();
});
