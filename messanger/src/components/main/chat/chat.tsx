import Input from "./input";
import Messages from "./messages";

export default function Chat() {
  return (
    <>
      <div className="flex flex-col justify-between w-full m-4 ">
        <Messages />
        <Input />
      </div>
    </>
  );
}
