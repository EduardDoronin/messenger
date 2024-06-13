import Sidebar from "./sidebar/sidebar";
import Chat from "./chat/chat";
import Suchleiste from "./suchleiste";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-screen gap-8">
        <div className="">
          <Suchleiste />
        </div>
        <div className="flex flex-row w-5/6 p-4 bg-gray-300 h-4/5 rounded-2xl">
          <Sidebar />
          <Chat />
        </div>
      </div>
    </>
  );
}
