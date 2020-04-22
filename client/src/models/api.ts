import socketio from "socket.io-client";

interface Message {
  sender: string;
  text: string;
  time: number;
}

const socket: SocketIOClient.Socket = socketio("/");

const enterChat = (name: string) => {
  console.log(name);
  socket.emit("joinchat", name);
};

const logout = ()=>{
  socket.emit("leavechat");
}

const listen = (cb: (msg: Message) => void) => {
  socket.on("message", (msg: Message) => {
    cb(msg);
  });
};

const sendMessage = (message: string) => {
  socket.emit("message",message);
};

export { enterChat,logout, listen, sendMessage };
