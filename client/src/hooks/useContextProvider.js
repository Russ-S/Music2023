import { ContextProvider } from "../context/ContextProvider";
import { useContext } from "react";

export const useContextProvider = () => {
  const context = useContext(ContextProvider);

  if (!context) {
    throw Error(
      "useContextProvider must be used inside an ContextProviderProvider"
    );
  }

  return context;
};
