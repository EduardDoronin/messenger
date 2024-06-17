import { useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import ChatContext from "../../../context/ChatContext";
import Input from "./input";
import Messages from "./messages";
import { db } from "../../../firebase";

export default function Chat() {
  const {
    data: { user },
  } = useContext(ChatContext);
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const fetchDisplayName = async () => {
      if (user && user.uid) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setDisplayName(userData.displayName || user.uid);
          } else {
            console.warn("User document not found in Firestore.");
            setDisplayName(user.uid);
          }
        } catch (error) {
          console.error("Error fetching displayName from Firestore:", error);
          setDisplayName(user.uid);
        }
      }
    };

    fetchDisplayName();
  }, [user]);

  return (
    <>
      <div className="flex flex-col justify-between w-full mx-4">
        <div>Chat with {displayName}</div>

        <div className="flex flex-col w-full m-4 ">
          <div className="mb-4">
            <Messages />
          </div>
          <Input />
        </div>
      </div>
    </>
  );
}
