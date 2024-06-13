import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { calculateCombinedId } from "../components/otherLogic/combine";

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

export const ChatContext = createContext<{ currentUser: ICurrentUser | null }>({
  currentUser: null,
});

export const ChatContextProvider = ({ children }: any) => {
  const { currentUser } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const combinedId = calculateCombinedId(currentUser.currentUser, user);

  const chatReducer = (state: any, action: any) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId: combinedId,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return <ChatContext.Provider value={{ data: state, dispatch }}>{children}</ChatContext.Provider>;
};
