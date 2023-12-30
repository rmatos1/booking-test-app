import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';

export interface IDrawerContext {
  isDrawerVisible: boolean;
  setIsDrawerVisible: Dispatch<SetStateAction<boolean>>;
}

interface IDrawerProvider {
  children: ReactNode;
  customValue?: IDrawerContext;
}

export const DrawerContext = createContext<IDrawerContext>({
  isDrawerVisible: false,
  setIsDrawerVisible: () => null,
});

export const DrawerProvider = ({ children, customValue }: IDrawerProvider) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState<boolean>(false);

  return (
    <DrawerContext.Provider
      value={{
        isDrawerVisible,
        setIsDrawerVisible,
        ...customValue
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};
