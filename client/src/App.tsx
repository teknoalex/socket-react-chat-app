import React, { useState } from "react";
import "./App.css";
import Chat from "./components/Chat";
import { enterChat, logout } from "./models/api";
import Navbar from "./components/Navbar";
import EnterScreen from "./components/EnterScreen";
import {
  createMuiTheme,
  ThemeProvider,
  ThemeOptions,
  PaletteType,
  CssBaseline,
} from "@material-ui/core";

const themeObj: ThemeOptions = {
  palette: {
    type: "dark",
  },
};

const useDarkMode = () => {
  const [theme, setTheme] = useState<ThemeOptions>(themeObj);

  const type: PaletteType = theme.palette?.type ? theme.palette.type : "light";

  const toggleDarkMode = () => {
    const updatedTheme: ThemeOptions = {
      ...theme,
      palette: {
        ...theme.palette,
        type: type === "light" ? "dark" : "light",
      },
    };
    setTheme(updatedTheme);
  };

  return [theme, toggleDarkMode];
};

const App: React.FC = () => {
  const [entered, setEntered] = useState<boolean>(false);
  const [theme, toggleDarkMode] = useDarkMode();
  const [name, setName] = useState<string>("");

  const handleEnter = (userName: string) => {
    if (userName) {
      setName(userName);
      enterChat(userName);
      setEntered(true);
    }
  };

  const handleLogout = () => {
    logout();
    setEntered(false);
  };

  const themeConfig = createMuiTheme(theme as ThemeOptions);

  return (
    <ThemeProvider theme={themeConfig}>
      <CssBaseline>
        <div style={{ marginTop: 80 }}>
          <Navbar
            entered={entered}
            logout={handleLogout}
            toggleDarkMode={toggleDarkMode as () => void}
          />
          {entered ? (
            <Chat name={name} />
          ) : (
            <EnterScreen enterChat={handleEnter} />
          )}
        </div>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default App;
