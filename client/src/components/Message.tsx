import React from "react";
import IMessage from "../models/IMessage";
import {
  Card,
  Typography,
  CardContent,
  makeStyles,
  ListItem,
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

interface Props {
  message: IMessage;
  own: boolean;
}

const useStyles = makeStyles((theme) => ({
  meta: {
    color: grey[400],
  },
  card: {
    marginBottom: theme.spacing(2),
  },
  own: {
    marginLeft: theme.spacing(5),
  },
  other: {
    marginRight: theme.spacing(5),
  },
}));

const parseDate = (time: number): string => {
  const norm = (n: number): string => {
    return ("0" + n).slice(-2);
  };

  const myDate = new Date(time);
  const now = new Date();

  var minutes = myDate.getMinutes();
  var fMinutes = norm(minutes);
  if (myDate.getUTCDate() === now.getUTCDate()) {
    return `at ${myDate.getHours()}:${fMinutes}`;
  } else {
    return `${norm(myDate.getDate())}.${norm(myDate.getMonth())}.${norm(
      myDate.getFullYear()
    )}`;
  }
};

const Message = ({ message, own }: Props) => {
  const classes = useStyles();
  console.log("render");
  return (
    <Card
      variant="outlined"
      className={classes.card + " " + (own ? classes.own : classes.other)}
    >
      <CardContent>
        <Typography className={classes.meta} variant="caption">
          {own ? "me" : message.sender} {parseDate(message.time)}
        </Typography>
        <Typography>{message.text}</Typography>
      </CardContent>
    </Card>
  );
};

export default Message;
