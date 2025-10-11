import {
  StompSessionProvider,
  useStompClient,
  useSubscription,
} from "react-stomp-hooks";
import config from "../../config/config";
import { useState } from "react";
import { Button } from "@mui/material";
import secureStorage from "../../helper/secureStorage";

const WebSocket = () => {
  return (
    <StompSessionProvider
      url={`${config.baseUrl}ws?token=${secureStorage.getItem("data").type} ${
        secureStorage.getItem("data").token
      }`}
      // connectHeaders={{
      //   Authorization: `${secureStorage.getItem("data").type} ${
      //     secureStorage.getItem("data").token
      //   }`,
      // }}
      onConnect={() => console.log("Connected to WebSocket")}
      //   onDisconnect={() => console.log("Disconnected from WebSocket")}
      //   onWebSocketError={(error) => console.error("WebSocket error:", error)}
    >
      <div>Hello From Websocket Component....</div>
      <SubscribingComponent />
      <SendingMessages />
    </StompSessionProvider>
  );
};

function SubscribingComponent() {
  const [lastMessage, setLastMessage] = useState("No message received yet");

  useSubscription("/user/queue/reply", (message) =>
    setLastMessage(message.body)
  );

  return <div>Last Message: {lastMessage}</div>;
}

export function SendingMessages() {
  const stompClient = useStompClient();

  const sendMessage = () => {
    if (stompClient) {
      //Send Message
      stompClient.publish({
        destination: "/app/quiz/start",
        body: "Echo 123",
      });
    } else {
      //Handle error
    }
  };

  return <Button onClick={sendMessage}>Send Message</Button>;
}

export default WebSocket;
