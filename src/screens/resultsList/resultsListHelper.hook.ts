import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { hotelBedrooms } from "../../constants";
import {
  getDifferenceDates,
  formatDateToLocale,
  getAvailabilityParams,
} from "../../helpers";
import { useBooking } from "../../hooks";
import { BookingFormDataProps, IBedroom } from "../../types";

interface IAvailableBedrooms extends IBedroom {
  totalPrice: number;
}

interface IResults {
  checkIn: string;
  checkOut: string;
  numberOfNights: number;
  bedrooms: IAvailableBedrooms[];
}

interface IUseResultsListHelper {
  onBookingClick: (number: number) => void;
  isDrawerVisible: boolean;
  results: IResults;
  onFormSubmit: (data: BookingFormDataProps) => void;
  onCloseDrawer: () => void;
  selectedBedroom: number;
}

export const useResultsListHelper = (): IUseResultsListHelper => {
  const { confirmedBookings, checkBookingsOverlap } = useBooking();
  const [params, setParams] = useSearchParams();

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedBedroom, setSelectedBedroom] = useState<number>(0);

  const results = useMemo(() => {
    const { checkIn, checkOut, guests } = getAvailabilityParams(params);

    if (!checkIn || !checkOut || !guests) {
      return {
        checkIn: "",
        checkOut: "",
        numberOfNights: 0,
        bedrooms: [],
      };
    }

    /*
     * suggests only the bedrooms with capacity for the selected number of guests
     */
    const numberOfNights = getDifferenceDates(checkIn, checkOut);

    const bedroomsWithCapacity = hotelBedrooms.filter(
      (item: IBedroom) => item.fullCapacity >= Number(guests)
    );

    const availableBedrooms = bedroomsWithCapacity
      .filter((item) => {
        /*
         * checks if there is a date overlap, and returns the bedroom only if there isn't any booking in the selected period
         */
        const hasDateOverlap = checkBookingsOverlap({
          selectedBedroom: item.number,
          checkIn,
          checkOut,
        });

        return hasDateOverlap.length ? false : item;
      })
      .map((item) => ({
        ...item,
        totalPrice: item.dailyPrice * numberOfNights,
      }))
      .sort((a, b) => a.totalPrice - b.totalPrice);

    return {
      checkIn: formatDateToLocale(checkIn),
      checkOut: formatDateToLocale(checkOut),
      numberOfNights,
      bedrooms: availableBedrooms,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmedBookings, params]);

  const handleBookingOnClick = (number: number) => {
    setSelectedBedroom(number);
    setIsDrawerVisible(true);
  };

  const handleDrawerOnClose = () => {
    setIsDrawerVisible(false);
  };

  const handleAvailabilityOnClick = (data: BookingFormDataProps) => {
    const newParams = new URLSearchParams(params);
    newParams.set("checkIn", data.checkIn);
    newParams.set("checkOut", data.checkOut);
    newParams.set("guests", String(data.guests));
    setParams(newParams, { replace: true });
  };

  return {
    onBookingClick: handleBookingOnClick,
    isDrawerVisible,
    results,
    onFormSubmit: handleAvailabilityOnClick,
    onCloseDrawer: handleDrawerOnClose,
    selectedBedroom,
  };
};
