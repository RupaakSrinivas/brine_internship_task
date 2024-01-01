import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, UserData } from "../context";
import { handleUserLogin } from "../utils/ApiCallsAuth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();
  const { login, user } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      handleUserLogin(email, password).then((response) => {
        if (typeof response !== "string") {
          const cartitem = response.cart;

          const userdata: UserData = {
            name: response.name,
            profilePic: response.profilePic,
            username: response.username,
            password: response.password,
            email: response.email,
            cart: cartitem,
          };
          console.log(response, "response");
          console.log(userdata, "userdata");
          login(userdata);
          Navigate("/home");
          console.log(user, "user");
        } else {
          window.alert("Authorization Failed");
          console.log(response, "response from loginPage")
        }
      });
    } catch (e: any) {
      window.alert(e);
      console.log(e);
    }
  };

  return (
    <div className="flex justify-center items-center h-auto text-black">
      <div className="bg-[#ffffff] rounded px-8 pt-6 pb-8 mb-4 min-w-[30vw]">
        <h2 className="text-2xl font-bold mb-4 text-black">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-black text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="w-full bg-[#f2f6f9] py-2 px-3 rounded-full"
              id="email"
              type="email"
              value={email}
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-black text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password:
            </label>
            <input
              className="w-full bg-[#f2f6f9] py-2 px-3 rounded-full"
              id="password"
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-row justify-between items-center">
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="/register"
            >
              New User? Create<br/>an account
            </a>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
