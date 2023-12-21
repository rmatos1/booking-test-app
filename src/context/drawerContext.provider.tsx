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

export const DrawerContext = createContext<IDrawerContext>({
  isDrawerVisible: false,
  setIsDrawerVisible: () => null,
});

export const DrawerProvider = ({ children }: { children: ReactNode }) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState<boolean>(false);

  return (
    <DrawerContext.Provider
      value={{
        isDrawerVisible,
        setIsDrawerVisible,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};
