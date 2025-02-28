import { FormEvent, useContext, useEffect, useState } from "react";
import { FieldErrors, useForm, UseFormRegister } from "react-hook-form";
import { ConfirmedBookingsContext } from "../../context";
import { hideScroll, validateEmail } from "../../helpers";
import { IConfirmedBooking } from "../../types";

interface IUseMyBookingsHelper {
  register: UseFormRegister<{ email: string }>;
  errors: FieldErrors<{ email: string }>;
  lastCheckedEmail: string;
  isButtonDisabled: boolean;
  results: IConfirmedBooking[] | null;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onOpenDrawer: (item: IConfirmedBooking) => void;
  showModal: boolean;
  onCloseModal: () => void;
  selectedBooking: IConfirmedBooking | null;
  onOpenModal: (item: IConfirmedBooking) => void;
  onCancelBooking: () => void;
  isDrawerVisible: boolean;
  onCloseDrawer: () => void;
}

export const useMyBookingsHelper = (): IUseMyBookingsHelper => {
  const { confirmedBookings, setConfirmedBookings } = useContext(
    ConfirmedBookingsContext
  );

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<{ email: string }>({
    defaultValues: {
      email: "",
    },
  });

  const [lastCheckedEmail, setLastCheckedEmail] = useState<string>("");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [results, setResults] = useState<IConfirmedBooking[] | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedBooking, setSelectedBooking] =
    useState<IConfirmedBooking | null>(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const watchEmail = watch("email");

  useEffect(() => {
    const isValidEmail = validateEmail(watchEmail);

    if (!isValidEmail) {
      setError("email", {
        message: "Invalid email",
      });
    } else {
      clearErrors("email");
    }

    setIsButtonDisabled(!isValidEmail);
  }, [watchEmail, clearErrors, setError]);

  useEffect(() => {
    hideScroll(showModal);
  }, [showModal]);

  const handleFormOnSubmit = (data: { email: string }) => {
    const bookings = confirmedBookings?.filter(
      (item) => item.email === data.email
    );

    setLastCheckedEmail(data.email);
    setResults(bookings);
  };

  const handleOpenDrawerOnClick = (item: IConfirmedBooking) => {
    setSelectedBooking(item);

    setIsDrawerVisible(true);
  };

  const handleCloseModalOnClick = () => {
    setShowModal(false);
  };

  const handleOpenModalOnClick = (item: IConfirmedBooking) => {
    setSelectedBooking(item);

    setShowModal(true);
  };

  const handleCancelBookingOnClick = () => {
    const bookings = confirmedBookings.filter(
      (item) => item.id !== selectedBooking?.id
    );

    setConfirmedBookings(bookings);

    const updatedResults = (results || []).filter(
      (item) => item.id !== selectedBooking?.id
    );

    setResults(updatedResults);

    setShowModal(false);

    setSelectedBooking(null);
  };

  const handleDrawerOnClose = () => {
    setIsDrawerVisible(false);
  };

  return {
    lastCheckedEmail,
    register,
    errors,
    isButtonDisabled,
    results,
    onSubmit: handleSubmit(handleFormOnSubmit),
    onOpenDrawer: handleOpenDrawerOnClick,
    showModal,
    onCloseModal: handleCloseModalOnClick,
    selectedBooking,
    onOpenModal: handleOpenModalOnClick,
    onCancelBooking: handleCancelBookingOnClick,
    isDrawerVisible,
    onCloseDrawer: handleDrawerOnClose,
  };
};
