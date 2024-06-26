import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../../context/AuthContext";

interface MessageProps {
  message: any;
}

const Message = ({ message }: MessageProps) => {
  const { currentUser } = useContext(AuthContext);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const isOwnMessage = message.senderId === currentUser?.uid;

  const messageClass = isOwnMessage
    ? "ml-auto px-3 py-2 mb-2 text-white bg-blue-500 rounded max-w-96 text-wrap break-words"
    : "mr-auto px-3 py-2 mb-2 text-white bg-green-600 rounded max-w-96 text-wrap break-words";

  return (
    <div ref={ref} className="flex">
      <div className={messageClass}>
        <p>{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
