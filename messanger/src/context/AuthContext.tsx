import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

interface ICurrentUser {
  uid: string | null;
  displayName: string | null;
  email: string | null;
}

const initialUser: ICurrentUser = {
  uid: null,
  displayName: null,
  email: null,
};

export const AuthContext = createContext<{ currentUser: ICurrentUser | null }>({
  currentUser: null,
});

export default function AuthContextProvider({ children }: any) {
  const [currentUser, setCurrentUser] = useState<ICurrentUser>(initialUser);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
        });
      } else {
        setCurrentUser(initialUser);
      }
    });
    return () => unsub();
  }, []);

  return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>;
}
