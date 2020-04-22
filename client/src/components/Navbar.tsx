import React, { ReactElement } from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useTheme } from "@material-ui/core/styles";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";

interface Props {
  entered: boolean;
  logout: () => void;
  toggleDarkMode: () => void;
}
const useStyles = makeStyles((theme) => ({
  writing: {
    flexGrow: 1,
  },
  icon: {
    color: "white",
  },
  toolbar: {
    justifyContent: "space-between",
  },
}));

export default function Navbar({
  entered,
  logout,
  toggleDarkMode,
}: Props): ReactElement {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <AppBar>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6">Chat</Typography>
        <div id="buttons">
          <IconButton onClick={toggleDarkMode} className={classes.icon}>
            {theme.palette.type === "light" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>

          <IconButton onClick={logout} disabled={!entered} className={classes.icon}>
            <CloseIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}
