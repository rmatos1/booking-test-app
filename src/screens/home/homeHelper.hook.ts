import { useNavigate } from 'react-router-dom';
import { ScreenPaths } from '../../types';

interface IUseHomeHelper {
  onFormSubmit: () => void;
}

export const useHomeHelper = (): IUseHomeHelper => {
  const navigate = useNavigate();

  const handleFormOnSubmit = () => {
    navigate(`/${ScreenPaths.resultsList}`);
  };

  return {
    onFormSubmit: handleFormOnSubmit,
  };
};
