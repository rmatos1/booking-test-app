import { useEffect, useState, useMemo, useCallback } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  FieldErrors,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import moment from "moment";
import { getLimitDates, getAvailabilityParams } from "../../helpers";
import { BookingFormDataProps, ILimitDates, ScreenPaths } from "../../types";

interface IUserBookingFormHelperOutput {
  isButtonDisabled: boolean;
  limitDates: {
    checkIn: ILimitDates;
    checkOut: ILimitDates;
  };
  register: UseFormRegister<BookingFormDataProps>;
  handleSubmit: UseFormHandleSubmit<BookingFormDataProps, undefined>;
  errors: FieldErrors<BookingFormDataProps>;
}

export const useBookingFormHelper = (): IUserBookingFormHelperOutput => {
  const location = useLocation();
  const [params] = useSearchParams();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    setError,
    clearErrors,
    formState: { isValid, errors },
  } = useForm<BookingFormDataProps>({
    defaultValues: {
      checkIn: "",
      checkOut: "",
      guests: "",
    },
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const watchCheckIn = watch("checkIn");
  const watchCheckOut = watch("checkOut");

  const limitDates = useMemo(() => {
    return getLimitDates(watchCheckIn, watchCheckOut);
  }, [watchCheckIn, watchCheckOut]);

  const fillBookingForm = useCallback(async () => {
    const { checkIn, checkOut, guests } = getAvailabilityParams(params);

    if (checkIn) {
      setValue("checkIn", checkIn);
    }

    if (checkOut) {
      setValue("checkOut", checkOut);
    }
    if (guests) {
      setValue("guests", guests);
    }

    await trigger();
  }, [params, setValue, trigger]);

  useEffect(() => {
    /*
     * set the initial input values for the results list page
     */
    if (location.pathname === ScreenPaths.resultsList) {
      fillBookingForm();
    }
  }, [location.pathname, fillBookingForm]);

  const isValidDate = useCallback(
    (dateString: string) => {
      if (!dateString) {
        return false;
      }

      if (moment(dateString).isBefore(limitDates.checkIn.min)) {
        return false;
      }

      if (moment(dateString).isAfter(limitDates.checkOut.max)) {
        return false;
      }

      return true;
    },
    [limitDates]
  );

  useEffect(() => {
    const isValidCheckIn =
      isValidDate(watchCheckIn) &&
      (watchCheckOut
        ? moment(watchCheckIn).isBefore(moment(watchCheckOut))
        : true);

    if (!isValidCheckIn) {
      setError("checkIn", {
        message: "Invalid check-in date",
      });
    } else {
      clearErrors("checkIn");
    }

    const isValidCheckOut =
      isValidDate(watchCheckOut) &&
      (watchCheckIn
        ? moment(watchCheckOut).isAfter(moment(watchCheckIn))
        : true);

    if (!isValidCheckOut) {
      setError("checkOut", {
        message: "Invalid check-out date",
      });
    } else {
      clearErrors("checkOut");
    }

    const isValidForm = isValid && isValidCheckIn && isValidCheckOut;

    setIsButtonDisabled(!isValidForm);
  }, [
    isValid,
    watchCheckIn,
    watchCheckOut,
    setError,
    isValidDate,
    clearErrors,
  ]);

  return {
    isButtonDisabled,
    limitDates,
    register,
    handleSubmit,
    errors,
  };
};
