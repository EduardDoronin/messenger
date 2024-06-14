import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useState } from "react";

export default function Log() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };

  function handleAccountClick() {
    navigate("/register");
  }

  return (
    <>
      <div className="flex items-center justify-center w-full h-screen select-none">
        <div className="px-8 py-12 bg-gray-300 shadow-xl rounded-3xl">
          <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
            <input
              type="email"
              className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="eduard@bs1in.de"
              required
            />
            <label className="block mb-2 text-sm font-medium text-gray-900">Passwort</label>
            <input
              type="password"
              className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              required
            />
            <button
              type="submit"
              className="focus:cursor-progress text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Login
            </button>
          </form>
          <a onClick={handleAccountClick}>Kein Account?</a>
        </div>
      </div>
    </>
  );
}