import moment from "moment";
import { hotelBedrooms } from "../constants";
import { ICheckBooking } from "../types";

export const getDifferenceDates = (startDate: string, endDate: string) => {
  if (moment(startDate) > moment(endDate)) {
    return 0;
  }

  const formattedStartDate = moment(startDate);
  const formattedEndDate = moment(endDate);

  return formattedEndDate.diff(formattedStartDate, "days");
};

export const hideScroll = (hide?: boolean) => {
  const body = document.getElementsByTagName("body")[0];
  body.style.overflow = hide ? "hidden" : "unset";
};

/**
 * gets the min and max dates for the start and end dates, avoiding the selection of dates before the current plus one and the selection of a date for check-in later than the check-out date, and vice-versa
 */
export const getLimitDates = (startDate: string, endDate: string) => {
  const checkInMinDate = moment().add(1, "days");

  const checkInMaxDate = moment(endDate).subtract(1, "days");

  const checkInDate = startDate || checkInMinDate;

  const checkOutMinDate = moment(checkInDate).add(1, "days");
  const checkOutMaxDate = moment().add(1, "years");

  return {
    checkIn: {
      min: checkInMinDate.format("YYYY-MM-DD"),
      max: checkInMaxDate.format("YYYY-MM-DD"),
    },
    checkOut: {
      min: checkOutMinDate.format("YYYY-MM-DD"),
      max: checkOutMaxDate.format("YYYY-MM-DD"),
    },
  };
};

export const calculateBookingTotalPrice = ({
  selectedBedroom,
  checkIn,
  checkOut,
}: ICheckBooking) => {
  const nights = getDifferenceDates(checkIn, checkOut);

  const bedroom = hotelBedrooms.find((item) => item.number === selectedBedroom);

  return bedroom?.dailyPrice ? bedroom.dailyPrice * nights : 0;
};

export const formatDateToLocale = (dateString: string) => {
  const date = new Date(`${dateString}T00:00:00`);
  const userLocale = navigator.language;
  const formatter = new Intl.DateTimeFormat(userLocale);

  return formatter.format(date);
};

export const getAvailabilityParams = (params: URLSearchParams) => {
  const checkIn = params.get("checkIn") || "";
  const checkOut = params.get("checkOut") || "";
  const guests = params.get("guests") || 0;

  return { checkIn, checkOut, guests };
};
