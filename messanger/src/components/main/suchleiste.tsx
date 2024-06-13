import { useState, useContext } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  getDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";

interface User {
  uid: string;
  displayName: string;
  email: string;
}

export default function Suchleiste() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<User | undefined>();
  const [err, setErr] = useState(false);

  const currentUser = useContext(AuthContext);

  async function handleSearch() {
    const q = query(collection(db, "users"), where("displayName", "==", username));
    const querySnapshot = await getDocs(q);

    try {
      querySnapshot.forEach((doc: any) => {
        setUser(doc.data());
      });
    } catch (error) {
      setErr(true);
    }
  }

  const handleKey = (e: any) => {
    e.code === "Enter" && handleSearch();
  };

  async function createChatDocument(combinedId: string) {
    await setDoc(doc(db, "chats", combinedId), { messages: [] });
  }

  async function updateUserChats(userId: string, combinedId: string, userInfo: any) {
    await updateDoc(doc(db, "userChats", userId), {
      [combinedId + ".userInfo"]: userInfo,
      [combinedId + ".date"]: serverTimestamp(),
    });
  }

  async function handleSelect() {
    const combinedId = calculateCombinedId(currentUser.currentUser, user);

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await createChatDocument(combinedId);

        const userInfoCurrentUser = {
          uid: user?.uid,
          displayName: user?.displayName,
        };

        const userInfoUser = {
          uid: currentUser.currentUser?.uid,
          displayName: currentUser.currentUser?.displayName,
        };

        await updateUserChats(currentUser.currentUser.uid, combinedId, userInfoCurrentUser);
        await updateUserChats(user.uid, combinedId, userInfoUser);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function calculateCombinedId(user1: any, user2: any) {
    return user1?.uid > user2?.uid ? user1?.uid + user2?.uid : user2?.uid + user1?.uid;
  }

  return (
    <>
      <div>
        <input
          className="w-full p-2 text-sm text-gray-900 transition-shadow duration-300 bg-gray-100 border border-gray-300 rounded-lg shadow-none cursor-text hover:shadow-lg hover:shadow-gray-400"
          placeholder="Suche eine Person"
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKey}
          data-popover-target="popover"
        />
        {err && <div>User not found</div>}

        {user && (
          <button
            data-popover="popover"
            className="absolute p-4 mt-2 font-sans text-sm font-normal break-words whitespace-normal bg-white border rounded-lg shadow-lg w-max border-blue-gray-50 text-blue-gray-500 shadow-blue-gray-500/10 focus:outline-none"
            onClick={handleSelect}
          >
            {user.displayName}
          </button>
        )}
      </div>
    </>
  );
}
