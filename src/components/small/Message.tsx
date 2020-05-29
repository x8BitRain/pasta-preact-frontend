import { h } from "preact";
import "../../style/small/message.scss";

const Message = message => {
  const msg = message.message;
  return (
    <div className="nav-message">
      <p>{msg.content}</p>
      {msg.type ? (
        <img src="../assets/icons/check.svg" alt="True" />
      ) : (
        <img src="../assets/icons/cross.svg" alt="False" />
      )}
    </div>
  );
};

export default Message; // not in use rn
