import { useState, useEffect } from 'react';

type SubItemProps = {
  fetchMessage: any;
};

const BotMessage = ({ fetchMessage }: SubItemProps) => {
  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadMessage() {
      const msg = await fetchMessage();
      setLoading(false);
      setMessage(msg);
    }
    loadMessage();
  }, [fetchMessage]);

  return (
    <div className="message-container">
      <div className="bot-message">{isLoading ? '...' : message}</div>
    </div>
  );
};

export default BotMessage;
