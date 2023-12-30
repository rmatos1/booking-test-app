import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { initialBookingData } from '../../constants';
import { ConfirmedBookingsContext, DrawerContext } from '../../context';
import { hideScroll, validateEmail } from '../../helpers';
import { IConfirmedBooking } from '../../types';

interface IUseMyBookingsHelper {
  email: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isButtonDisabled: boolean;
  results: IConfirmedBooking[];
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onOpenDrawer: (item: IConfirmedBooking) => void;
  showModal: boolean;
  onCloseModal: () => void;
  selectedBooking: IConfirmedBooking;
  onOpenModal: (item: IConfirmedBooking) => void;
  onCancelBooking: () => void;
  isDrawerVisible: boolean;
}

const initialSelectedBookingData = {
  ...initialBookingData,
  id: '',
  totalPrice: 0,
};

export const useMyBookingsHelper = (): IUseMyBookingsHelper => {
  const { confirmedBookings, setConfirmedBookings } = useContext(
    ConfirmedBookingsContext
  );
  const { isDrawerVisible, setIsDrawerVisible } = useContext(DrawerContext);

  const [email, setEmail] = useState<string>('');
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [results, setResults] = useState<IConfirmedBooking[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedBooking, setSelectedBooking] = useState<IConfirmedBooking>(
    initialSelectedBookingData
  );

  useEffect(() => {
    const isValid = validateEmail(email);

    setIsButtonDisabled(!isValid);
  }, [email]);

  useEffect(() => {
    hideScroll(showModal);
  }, [showModal]);

  const handleEmailOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleFormOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const bookings = confirmedBookings.filter((item) => item.email === email);

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
      (item) => item.id !== selectedBooking.id
    );

    setConfirmedBookings(bookings);

    const updatedResults = results.filter(
      (item) => item.id !== selectedBooking.id
    );

    setResults(updatedResults);

    setShowModal(false);

    setSelectedBooking(initialSelectedBookingData);
  };

  return {
    email,
    onChange: handleEmailOnChange,
    isButtonDisabled,
    results,
    onSubmit: handleFormOnSubmit,
    onOpenDrawer: handleOpenDrawerOnClick,
    showModal,
    onCloseModal: handleCloseModalOnClick,
    selectedBooking,
    onOpenModal: handleOpenModalOnClick,
    onCancelBooking: handleCancelBookingOnClick,
    isDrawerVisible,
  };
};
