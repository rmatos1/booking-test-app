import { useEffect } from "react";
import { CloseButton, Overlay } from "../../components";
import { IComponentWithChildren } from "../../types";
import { hideScroll } from "../../helpers";
import { Drawer } from "./baseDrawer.styles";

interface IBaseDrawer extends IComponentWithChildren {
  isDrawerVisible: boolean;
  onCloseDrawer: () => void;
}

/**
 * the base layout of the drawers
 * @param props.children - component to be rendered into the drawer
 * @param props.isDrawerVisible - boolean that indicates if the drawer is visible or not
 * @param props.onCloseDrawer - function to set the drawer visibility
 */

export const BaseDrawer = ({
  children,
  isDrawerVisible,
  onCloseDrawer,
}: IBaseDrawer) => {
  useEffect(() => {
    hideScroll(isDrawerVisible);
  }, [isDrawerVisible]);

  return (
    <>
      <Overlay onClick={onCloseDrawer} $isVisible={isDrawerVisible} />

      <Drawer $showDrawer={isDrawerVisible} data-testid="base-drawer">
        <CloseButton onClick={onCloseDrawer} data-testid="close-button">
          X
        </CloseButton>
        {children}
      </Drawer>
    </>
  );
};
