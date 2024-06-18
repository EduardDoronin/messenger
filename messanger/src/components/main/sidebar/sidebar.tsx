import { signOut } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { AuthContext } from "../../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { onSnapshot, doc, DocumentData, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import ChatContext from "../../../context/ChatContext";

export default function Sidebar() {
  const [chats, setChats] = useState<DocumentData | undefined>();
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const navigate = useNavigate();

  useEffect(() => {
    let unsubscribe: () => void;

    const getChats = async () => {
      if (currentUser?.uid) {
        unsubscribe = onSnapshot(doc(db, "userChats", currentUser.uid), async (docSnapshot) => {
          const chatsData = docSnapshot.data();

          if (chatsData) {
            const updatedChats = await Promise.all(
              Object.entries(chatsData).map(async ([, /* chatId */ chat]) => {
                const userDocRef = doc(db, "users", chat.userInfo.uid);
                const userDocSnap = await getDoc(userDocRef);

                const displayName = userDocSnap.exists()
                  ? userDocSnap.data().displayName
                  : chat.userInfo.uid;

                return {
                  ...chat,
                  userInfo: { ...chat.userInfo, displayName },
                };
              })
            );

            setChats(Object.fromEntries(updatedChats.map((chat) => [chat.userInfo.uid, chat])));
          }
        });
      }
    };

    getChats();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [currentUser?.uid]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };
  function handleSelect(u: any) {
    dispatch({ type: "CHANGE_USER", payload: u });
    console.log(u);
  }

  return (
    <>
      <div className="w-1/4 border-r border-r-gray-800">
        <div className="flex flex-row items-center justify-between m-4">
          <button
            onClick={handleLogout}
            className="p-1 mr-2 duration-300 bg-gray-100 rounded shadow-none cursor-pointer hover:shadow-lg hover:shadow-gray-400 focus:cursor-wait"
          >
            Logout
          </button>
          {currentUser && <div>{currentUser.email}</div>}
        </div>
        <div className="flex flex-col pt-4 m-4 border-t border-t-gray-800">
          {chats &&
            Object.entries(chats).map(([chatId, chat]) => (
              <div
                key={chatId}
                className="px-2 py-2 my-3 transition-shadow duration-300 shadow-none cursor-pointer rounded-xl hover:shadow-lg hover:shadow-gray-400 bg-slate-500"
                onClick={() => handleSelect(chat.userInfo)}
              >
                {chat.userInfo.displayName}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
