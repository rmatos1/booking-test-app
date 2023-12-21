import {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { BookingContext } from '../../context';
import { getLimitDates } from '../../helpers';
import {
  IBookingData,
  ILimitDates,
  IUseBookingFormHelper,
  ScreenPaths,
} from '../../types';

export interface IBookingForm {
  onFormSubmit?: () => void;
  title?: string;
}

interface IUseBookingFormHelperInput {
  onFormSubmit?: () => void;
}

type TFormData = Pick<IBookingData, 'checkIn' | 'checkOut' | 'qtyGuests'>;

interface IUserBookingFormHelperOutput extends IUseBookingFormHelper {
  formData: TFormData;
  limitDates: {
    checkIn: ILimitDates;
    checkOut: ILimitDates;
  };
}

export const useBookingFormHelper = ({
  onFormSubmit,
}: IUseBookingFormHelperInput): IUserBookingFormHelperOutput => {
  const location = useLocation();
  const { bookingData, setBookingData } = useContext(BookingContext);

  const [formData, setFormData] = useState<TFormData>({
    checkIn: '',
    checkOut: '',
    qtyGuests: '',
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const limitDates = useMemo(
    () => getLimitDates(formData.checkIn, formData.checkOut),
    [formData]
  );

  useEffect(() => {
    /*
     * set the initial value of the inputs for a page different from home
     */
    if (location.pathname !== ScreenPaths.home) {
      const { checkIn, checkOut, qtyGuests } = bookingData;

      setFormData({
        checkIn,
        checkOut,
        qtyGuests,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    const isValid = formData.checkIn && formData.checkOut && formData.qtyGuests;

    setIsButtonDisabled(!isValid);
  }, [formData]);

  const handleInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckAvailabilityOnClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.checkIn && formData.checkOut && formData.qtyGuests) {
      setBookingData((state) => ({ ...state, ...formData }));

      onFormSubmit?.();
    }
  };

  return {
    formData,
    onChange: handleInputOnChange,
    onSubmit: handleCheckAvailabilityOnClick,
    isButtonDisabled,
    limitDates,
  };
};
