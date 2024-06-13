export default function Input() {
  return (
    <>
      <div className="">
        <form action="" className="flex gap-4">
          <input
            className="block w-full p-2 text-sm text-gray-900 transition-shadow duration-300 bg-gray-100 border border-gray-300 rounded-lg shadow-none cursor-text hover:shadow-lg hover:shadow-gray-400"
            placeholder="Type a message!"
          />
          <button className="px-4 py-2 font-bold text-white transition-shadow duration-300 bg-blue-500 rounded-lg shadow-none cursor-pointer hover:bg-blue-700 hover:shadow-lg hover:shadow-gray-400">
            Send
          </button>
        </form>
      </div>
    </>
  );
}
