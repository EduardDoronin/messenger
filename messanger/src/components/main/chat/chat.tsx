import { useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import ChatContext from "../../../context/ChatContext";
import Input from "./input";
import Messages from "./messages";
import { db } from "../../../firebase";

export default function Chat() {
  const { data } = useContext(ChatContext);
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const fetchDisplayName = async () => {
      if (data.user && data.user.uid) {
        try {
          const userDocRef = doc(db, "users", data.user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setDisplayName(userData.displayName || data.user.uid);
          } else {
            setDisplayName(data.user.uid);
          }
        } catch (error) {
          console.error("Error fetching displayName from Firestore:", error);
          setDisplayName(data.user.uid);
        }
      }
    };

    fetchDisplayName();
  }, [data.user]);

  return (
    <>
      <div className="flex flex-col justify-between w-full h-full">
        <div className="flex items-center justify-center">
          {displayName ? (
            <div className="text-2xl">
              Chat with <span className="font-bold">{displayName}</span>
            </div>
          ) : (
            <div>Click at someone to start a Chat with him!</div>
          )}
        </div>
        <div className="h-full m-4 overflow-y-auto">
          <Messages />
        </div>

        <div className="p-4">
          <Input />
        </div>
      </div>
    </>
  );
}
