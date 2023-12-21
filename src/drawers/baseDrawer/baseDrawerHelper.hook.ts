import { useContext, useEffect, useState } from 'react';
import { DrawerContext } from '../../context';
import { hideScroll } from '../../helpers';

interface IUseBaseDrawerHelper {
  showDrawer: boolean;
  onHide: () => void;
}

export const useBaseDrawerHelper = (): IUseBaseDrawerHelper => {
  const { setIsDrawerVisible } = useContext(DrawerContext);

  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  useEffect(() => {
    setShowDrawer(true);
  }, []);

  /*
   * hides the scroll bar when the drawer is visible, and vice-versa
   */
  useEffect(() => {
    hideScroll(showDrawer);
  }, [showDrawer]);

  const hideDrawerOnClick = () => {
    setShowDrawer(false);

    setTimeout(() => setIsDrawerVisible(false), 250);
  };

  return {
    showDrawer,
    onHide: hideDrawerOnClick,
  };
};
