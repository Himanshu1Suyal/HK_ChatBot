import { Chatbot } from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";

import config from "./bot/config";
import MessageParser from "./bot/MessageParser";
import ActionProvider from "./bot/ActionProvider";

function App() {
  return (
    <div>
      <h2>HK Glam Studio Assistant 💄</h2>
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
}

export default App;