import { CloseButton, Overlay } from '../../components';
import { IComponentWithChildren } from '../../types';
import { Drawer } from './baseDrawer.styles';
import { useBaseDrawerHelper } from './baseDrawerHelper.hook';

/**
 * the base layout of the drawers
 * @param props.children - component to be rendered into the drawer
 */
export const BaseDrawer = ({ children }: IComponentWithChildren) => {
  const { showDrawer, onHide } = useBaseDrawerHelper();

  return (
    <>
      <Overlay onClick={() => onHide()} />

      <Drawer $showDrawer={showDrawer} data-testid="base-drawer">
        <CloseButton onClick={onHide} data-testid="close-button">
          X
        </CloseButton>
        {children}
      </Drawer>
    </>
  );
};
