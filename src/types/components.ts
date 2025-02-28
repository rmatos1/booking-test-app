import { ReactNode } from "react";

export interface IComponentWithChildren {
  children?: ReactNode;
}

export interface IBaseDrawer extends IComponentWithChildren {
  isDrawerVisible: boolean;
  onCloseDrawer: () => void;
}
