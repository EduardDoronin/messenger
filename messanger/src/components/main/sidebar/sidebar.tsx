import { signOut } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { AuthContext } from "../../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { onSnapshot, doc, DocumentData } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [chats, setChats] = useState<DocumentData | undefined>();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getChats = async () => {
      if (currentUser?.uid) {
        onSnapshot(doc(db, "userChats", currentUser.uid), (docSnapshot) => {
          setChats(docSnapshot.data());
        });
      }
    };

    getChats();
  }, [currentUser?.uid]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <>
      <div className="w-1/4 border-r border-r-gray-800">
        <div className="flex flex-row justify-between m-4">
          <div className="flex items-center">
            <div>Chat</div>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="p-1 mr-2 duration-300 bg-gray-100 rounded shadow-none cursor-pointer hover:shadow-lg hover:shadow-gray-400 focus:cursor-wait"
            >
              Logout
            </button>
            {currentUser && <div>{currentUser.email}</div>}
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
