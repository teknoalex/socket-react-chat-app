import React from "react";
import IMessage from "../models/IMessage";
import { Card, Typography, CardContent } from "@material-ui/core";

interface Props {
  message: IMessage;
  own: boolean;
}

const parseDate = (time: number): string => {
  const myDate = new Date(time);

  var minutes = myDate.getMinutes();
  var fMinutes = ("0" + minutes).slice(-2);
  return `at ${myDate.getHours()}:${fMinutes}`;
};

const Message = ({ message, own }: Props) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography>
          {own ? "me" : message.sender} {parseDate(message.time)}
        </Typography>
        <Typography>{message.text}</Typography>
      </CardContent>
    </Card>
  );
};

export default Message;
