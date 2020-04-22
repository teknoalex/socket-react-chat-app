import React, { ChangeEvent, useState, FormEvent } from "react";
import { TextField, Button, makeStyles, Typography } from "@material-ui/core";

interface Props {
  enterChat: (name: string) => void;
}
const useStyles = makeStyles((theme) => ({
  button: {
    marginBottom: 0,
  },
  form: {
    display: "flex",
    alignContent: "center",
  },
}));

const EnterScreen = ({ enterChat }: Props) => {
  const [name, setName] = useState<string>("");
  const [errorText, setErrorText] = useState<string>(); //TODO: Implement validation later

  const classes = useStyles();

  const submitName = (e: FormEvent) => {
    e.preventDefault();
    if (name) {
      enterChat(name);
    }
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (e.target.value === "") {
      setErrorText("Cannot be empty");
    } else if (e.target.value.length > 50) {
      setErrorText("Too long");
    }
  };
  return (
    <div>
      <Typography>Type your name to enter Chat</Typography>
      <form className={classes.form} onSubmit={submitName}>
        <TextField label="Your Username" value={name} onChange={onChange} />
        <Button className={classes.button} type="submit">
          Enter
        </Button>
      </form>
    </div>
  );
};

export default EnterScreen;
