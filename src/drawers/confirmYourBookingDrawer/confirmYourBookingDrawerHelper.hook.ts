import moment from "moment";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  SubmitHandler,
  FieldErrors,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import {
  calculateBookingTotalPrice,
  validateEmail,
  validateName,
  getAvailabilityParams,
} from "../../helpers";
import { useBooking } from "../../hooks";
import { IBookingData } from "../../types";

type TFormData = Pick<IBookingData, "name" | "email">;

interface IUseConfirmYourBookingDrawerHelper {
  register: UseFormRegister<TFormData>;
  isButtonDisabled: boolean;
  errors: FieldErrors<TFormData>;
  onSubmit: (data: TFormData) => void;
}

export const useConfirmYourBookingDrawerHelper = (
  selectedBedroom: number
): IUseConfirmYourBookingDrawerHelper => {
  const [params] = useSearchParams();

  const { confirmedBookings, confirmBooking } = useBooking();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<TFormData>({
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const { checkIn, checkOut, guests } = getAvailabilityParams(params);

  const watchName = watch("name");
  const watchEmail = watch("email");

  useEffect(() => {
    const isValidName = validateName(watchName);

    if (!isValidName) {
      setError("name", {
        message: "Name must have at least 3 characters",
      });
    } else {
      clearErrors("name");
    }

    const isValidEmail = validateEmail(watchEmail);

    if (!isValidEmail) {
      setError("email", {
        message: "Invalid email",
      });
    } else {
      clearErrors("email");
    }

    const isValidForm = isValidName && isValidEmail;

    setIsButtonDisabled(!isValidForm);
  }, [watchName, watchEmail, setError, clearErrors]);

  const handleConfirmBookingOnSubmit: SubmitHandler<TFormData> = (
    data: TFormData
  ) => {
    const id = `${moment().unix()}${btoa(data.email)}`;

    const totalPrice = calculateBookingTotalPrice({
      selectedBedroom,
      checkIn,
      checkOut,
    });

    const bookings = [
      ...confirmedBookings,
      {
        checkIn,
        checkOut,
        guests,
        selectedBedroom,
        ...data,
        id,
        totalPrice,
      },
    ];

    confirmBooking({
      bookings,
      id,
    });
  };

  return {
    onSubmit: handleSubmit(handleConfirmBookingOnSubmit),
    isButtonDisabled,
    register,
    errors,
  };
};
