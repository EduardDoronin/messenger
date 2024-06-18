import { useContext, useEffect, useState } from "react";
import ChatContext from "../../../context/ChatContext";
import { doc, onSnapshot, collection } from "firebase/firestore";
import { db } from "../../../firebase";
import Message from "./message";

export default function Messages() {
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

  console.log(messages);

  return (
    <>
      {messages.map((m: any) => (
        <Message message={m} key={m.id} />
      ))}
    </>
  );
}
