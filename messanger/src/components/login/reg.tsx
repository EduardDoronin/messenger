import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Reg() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
      });

      await setDoc(doc(db, "userChats", res.user.uid), {});
      navigate("/");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  function handleAccountClick() {
    navigate("/login");
  }

  return (
    <>
      <div className="flex items-center justify-center w-full h-screen select-none">
        <div className="px-8 py-12 bg-gray-300 shadow-xl rounded-3xl">
          <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <label className="block mb-2 text-sm font-medium text-gray-900">Displayname</label>
            <input
              type="name"
              className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Enter your display name"
              required
            />
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
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Registrieren
            </button>
          </form>
          <a onClick={handleAccountClick}>Bereits ein Account?</a>
        </div>
      </div>
    </>
  );
}
