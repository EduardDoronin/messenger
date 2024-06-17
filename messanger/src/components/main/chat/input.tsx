import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import ChatContext from "../../../context/ChatContext";
import { updateDoc, doc, Timestamp, arrayUnion } from "firebase/firestore";
import { db } from "../../../firebase";
import { v4 as uuidv4 } from "uuid";

export default function Input() {
  const [text, setText] = useState("");

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    console.log("Chat ID:", data.chatId, typeof data.chatId);
    console.log("Current User:", currentUser, typeof currentUser?.uid);

    if (text.trim() !== "") {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuidv4(),
          text,
          senderId: currentUser?.uid,
          date: Timestamp.now(),
        }),
      });
    }
  }
  return (
    <>
      <div className="">
        <form action="" className="flex gap-4">
          <input
            type="text"
            placeholder="Type something..."
            onChange={(e) => setText(e.target.value)}
            value={text}
            className="block w-full p-2 text-sm text-gray-900 transition-shadow duration-300 bg-gray-100 border border-gray-300 rounded-lg shadow-none cursor-text hover:shadow-lg hover:shadow-gray-400"
          />
          <button
            onClick={handleClick}
            className="px-4 py-2 font-bold text-white transition-shadow duration-300 bg-blue-500 rounded-lg shadow-none cursor-pointer hover:bg-blue-700 hover:shadow-lg hover:shadow-gray-400"
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
}
