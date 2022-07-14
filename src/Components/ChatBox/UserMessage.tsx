type SubItemProps = {
  text: any;
};
const UserMessage = ({ text }: SubItemProps) => {
  return (
    <div className="message-container">
      <div className="user-message">{text}</div>
    </div>
  );
};
export default UserMessage;
