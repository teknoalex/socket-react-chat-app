import React, { ChangeEvent, useState, FormEvent, useEffect } from "react";
import { listen, sendMessage } from "../models/api";
import { TextField, makeStyles, IconButton, Card } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import IMessage from "../models/IMessage";
import Message from "./Message";

interface Props {
  name: string;
}

const useStyles = makeStyles((theme) => ({
  card: {
    position: "fixed",
    bottom: 0,
    width: "100vw",
  },

  form: {
    display: "flex",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  inputField: {
    flexGrow: 1,
  },
  iconButton: {
    marginRight: theme.spacing(2),
  },
}));
const Chat: React.FC<Props> = ({ name }: Props) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [myMessage, setMyMessage] = useState<string>("");

  const classes = useStyles();

  useEffect(() => {
    listen((data: IMessage) => setMessages([...messages, data]));
  });
  

  const submitMsg = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(myMessage);
    e.currentTarget.reset();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMyMessage(e.target.value);
  };

  return (
    <div style={{ marginTop: 80 }}>
      {messages.map((msg) => (
        <Message
          message={msg}
          own={msg.sender === name}
          key={msg.sender + msg.time}
        />
      ))}

      <Card className={classes.card}>
        <form onSubmit={submitMsg} className={classes.form}>
          <TextField className={classes.inputField} onChange={onChange} />
          <IconButton type="submit" className={classes.iconButton}>
            <SendIcon />
          </IconButton>
        </form>
      </Card>
    </div>
  );
};

export default Chat;
