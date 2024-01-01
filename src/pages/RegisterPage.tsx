import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Register() {
    const Navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        Navigate("/login");
    };

    return (
        <div className="flex justify-center items-center h-auto">
          <div className="bg-[#1f2937] border-2 border-[#363f4b] shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-4 text-white">Login</h2>
            <form onSubmit={handleSubmit}>

            <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Name:
                </label>
                <input
                  className="shadow appearance-none bg-[#1f2937] border border-slate-400 rounded w-full min-w-[20vw] py-2 px-3 text-white leading-tight focus:outline-none focus:border-[#a9792b]"
                  id="name"
                  type="text"
                  value={name}
                  required
                  onChange={e => setName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Username:
                </label>
                <input
                  className="shadow appearance-none bg-[#1f2937] border border-slate-400 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:border-[#a9792b]"
                  id="username"
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email:
                </label>
                <input
                  className="shadow appearance-none bg-[#1f2937] border border-slate-400 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:border-[#a9792b]"
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-slate-200 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password:
                </label>
                <input
                  className="shadow appearance-none bg-[#1f2937] border border-slate-400 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:border-[#a9792b]"
                  id="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="flex flex-row justify-between items-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Register
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => Navigate("/login")}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      );
}