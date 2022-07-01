import { useState } from 'react';
import API from './API';
import BotMessage from './BotMessage';
import Header from './Header';
import Input from './Input';
import Messages from './Message';
import UserMessage from './UserMessage';
import './ChatBot.scss';

function ChatbotMessage() {
  const [messages, setMessages] = useState<any>([]);
  const send = async (text: string) => {
    const newMessages = messages.concat(
      <UserMessage key={messages.length + 1} text={text} />,
      <BotMessage
        key={messages.length + 2}
        fetchMessage={async () => await API.GetChatbotResponse(text)}
      />
    );
    setMessages(newMessages);
  };

  return (
    <div className="chatbot">
      <Header />
      <Messages messages={messages} />
      <Input onSend={send} />
    </div>
  );
}
export default ChatbotMessage;
