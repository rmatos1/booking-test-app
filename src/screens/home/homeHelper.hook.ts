import { useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import { ScreenPaths, BookingFormDataProps } from "../../types";

interface IUseHomeHelper {
  onFormSubmit: (data: BookingFormDataProps) => void;
}

export const useHomeHelper = (): IUseHomeHelper => {
  const navigate = useNavigate();

  const onFormSubmit: SubmitHandler<BookingFormDataProps> = (
    data: BookingFormDataProps
  ) => {
    navigate(
      `/${ScreenPaths.resultsList}?checkIn=${data.checkIn}&checkOut=${data.checkOut}&guests=${data.guests}`
    );
  };

  return {
    onFormSubmit,
  };
};
