import React, { ChangeEvent, useState, FormEvent, useEffect } from "react";
import { listen, sendMessage } from "../models/api";
import { TextField, makeStyles, IconButton, Card } from "@material-ui/core";

import IMessage from "../models/IMessage";
import Message from "./Message";
import InputBar from "./InputBar";

interface Props {
  name: string;
}

const submitMsg = (myMessage:string) => {
  sendMessage(myMessage);
};



const useStyles = makeStyles((theme) => ({
  mainDiv:{
    marginTop: 80,
    marginBottom:64
  }
}));
const Chat: React.FC<Props> = ({ name }: Props) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const classes = useStyles();




  useEffect(() => {
    listen((data: IMessage) => setMessages([...messages, data]));
  });
  





  return (
    <div className={classes.mainDiv}>
      {messages.map((msg) => (
        <Message
          message={msg}
          own={msg.sender === name}
          key={msg.sender + msg.time}
        />
      ))}

        <InputBar submitMsg={submitMsg}/>
    </div>
  );
};

export default Chat;
