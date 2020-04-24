import React, { ChangeEvent, useState, FormEvent } from "react";
import { Card, IconButton, TextField, makeStyles } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

interface Props {
  submitMsg: (myMessage:string) => void;
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
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  iconButton: {
    marginRight: theme.spacing(2),
  },
}));

const InputBar = ({ submitMsg }: Props) => {
  const [myMessage, setMyMessage] = useState<string>("");
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMyMessage(e.target.value);
  };

  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <form onSubmit={(e:FormEvent)=>{
          e.preventDefault();
          submitMsg(myMessage);
          setMyMessage("");
      }} className={classes.form}>
        <TextField className={classes.inputField} placeholder="type something..." onChange={onChange} value={myMessage}/>
        <IconButton type="submit" className={classes.iconButton}>
          <SendIcon />
        </IconButton>
      </form>
    </Card>
  );
};

export default InputBar;
