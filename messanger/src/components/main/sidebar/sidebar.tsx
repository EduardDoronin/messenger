import { signOut } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { AuthContext } from "../../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { onSnapshot, doc } from "firebase/firestore";

export default function Sidebar() {
  const [chats, setChats] = useState();
  const currentUser = useContext(AuthContext);

  useEffect(() => {
    function getChats() {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.currentUser?.uid), (doc: any) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    }

    currentUser.currentUser?.uid && getChats();
  }, [currentUser.currentUser?.uid]);

  console.log(chats);

  return (
    <>
      <div className="w-1/4 border-r border-r-gray-800">
        <div className="flex flex-row justify-between m-4">
          <div className="flex items-center">
            <div>Chat</div>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => signOut(auth)}
              className="p-1 mr-2 duration-300 bg-gray-100 rounded shadow-none cursor-pointer hover:shadow-lg hover:shadow-gray-400 focus:cursor-wait"
            >
              Logout
            </button>
            {currentUser && <div>{currentUser.currentUser?.email}</div>}
          </div>
        </div>
        <div className="flex flex-col pt-4 m-4 border-t border-t-gray-800">
          {chats &&
            Object.keys(chats).map((chatId) => (
              <div
                key={chatId}
                className="px-2 py-2 my-3 transition-shadow duration-300 shadow-none cursor-pointer rounded-xl hover:shadow-lg hover:shadow-gray-400 bg-slate-500"
              >
                {chats[chatId].userInfo.displayName}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
