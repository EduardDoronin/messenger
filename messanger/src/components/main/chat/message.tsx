import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import ChatContext from "../../../context/ChatContext";

export default function Message({ message }: any) {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const isOwnMessage = message.senderId === currentUser?.uid;

  return (
    <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-3 py-2 rounded text-white ${
          isOwnMessage ? "bg-indigo-600 self-end" : "bg-green-600 self-start"
        }`}
      >
        {message.text}
        <span className="block text-xs text-gray-200">{message.date.toDate()}</span>
      </div>
    </div>
  );
}
