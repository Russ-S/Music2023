import { createContext, useReducer } from "react";

export const ContextProvider = createContext();

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_COMPOSERS":
      return {
        composers: action.payload,
      };
    case "CREATE_COMPOSER":
      return {
        composers: [action.payload, ...state.composers],
      };

    default:
      return state;
  }
};

export const MusicContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    composers: null,
  });

  return (
    <ContextProvider.Provider value={{ ...state, dispatch }}>
      {children}
    </ContextProvider.Provider>
  );
};
