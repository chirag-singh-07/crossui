import React from "react";
import { Tokens } from "@crossui/core";

export const ThemeContext = React.createContext({
  colors: Tokens.colors,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ThemeContext.Provider value={{ colors: Tokens.colors }}>
      {children}
    </ThemeContext.Provider>
  );
};
