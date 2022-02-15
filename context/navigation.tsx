import { createContext, FC, useContext, useState } from "react";

export type Coords = {
  x: number;
  y: number;
};

type NavigationContextValue = {
  rootCoords: Coords;
  setRootCoords: (coords: Coords) => void;
};

const NavigationContext = createContext<NavigationContextValue | undefined>(undefined);

export const NavigationContextProvider: FC = ({ children }) => {
  const [rootX, setRootX] = useState<number>(0);
  const [rootY, setRootY] = useState<number>(0);

  const setRootCoords = (coords: Coords) => {
    setRootX(coords.x);
    setRootY(coords.y);
  };

  return (
    <NavigationContext.Provider value={{ rootCoords: { x: rootX, y: rootY }, setRootCoords }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationContext = (): NavigationContextValue => {
  const navigationContextValue = useContext(NavigationContext);

  if (!navigationContextValue) {
    throw Error("useNavigationContext hook must be used inside NavigationContext provider");
  }

  return navigationContextValue;
};
