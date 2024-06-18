import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../../context/AuthContext";
import ChatContext from "../../../context/ChatContext";

const Message = ({ message }: any) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  return (
    <div className="flex">
      <div className="self-end px-3 py-2 mb-2 text-white bg-indigo-600 rounded">
        <p>{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
