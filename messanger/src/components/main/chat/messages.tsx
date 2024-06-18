import { useContext, useEffect, useState } from "react";
import ChatContext from "../../../context/ChatContext";
import { doc, onSnapshot, collection } from "firebase/firestore";
import { db } from "../../../firebase";
import Message from "./message";

interface MessagesProps {
  currentUserId: string;
}

export default function Messages({ currentUserId }: MessagesProps) {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    if (data.chatId && typeof data.chatId === "string") {
      const docRef = doc(collection(db, "chats"), data.chatId);

      const unSub = onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
          setMessages(doc.data().messages || []);
        }
      });

      return () => {
        unSub();
      };
    }
  }, [data.chatId]);

  return (
    <div className="flex flex-col">
      {messages.map((m: any) => {
        if (m.senderId && m.id) {
          return <Message key={m.id} message={m} />;
        } else {
          console.warn("Invalid message format:", m);
          return null;
        }
      })}
    </div>
  );
}
