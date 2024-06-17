import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { calculateCombinedId } from "../components/otherLogic/combine";

interface IUser {
  uid: any;
  displayname: any;
  email: any;
}

interface IChatState {
  chatId: any;
  user: any;
}

interface IChatAction {
  type: "CHANGE_USER";
  payload: IUser;
}

const ChatContext = createContext<{
  data: IChatState;
  dispatch: React.Dispatch<IChatAction>;
}>({
  data: { chatId: null, user: null },
  dispatch: () => {},
});

export const ChatContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useContext(AuthContext);

  const INITIAL_STATE: IChatState = {
    chatId: null,
    user: null,
  };

  const chatReducer = (state: IChatState, action: IChatAction): IChatState => {
    switch (action.type) {
      case "CHANGE_USER":
        console.log(typeof currentUser?.uid, "       test", typeof action.payload);
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  return <ChatContext.Provider value={{ data: state, dispatch }}>{children}</ChatContext.Provider>;
};

export default ChatContext;
