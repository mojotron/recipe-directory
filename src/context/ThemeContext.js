import { createContext, useReducer } from "react";

export const ThemeContext = createContext();

const themeReducer = () => {};

export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, {
    color: "blue",
  });

  const changeColor = (color) => {};
  return (
    <ThemeContext.Provider value={{ color: "blue" }}>
      {children}
    </ThemeContext.Provider>
  );
};
