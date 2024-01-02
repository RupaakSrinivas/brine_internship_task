import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, UserData } from "../context";
import { handleUserRegistration } from "../utils/ApiCallsAuth";

export default function Register() {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const { login, user } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await handleUserRegistration(
        name,
        username,
        email,
        password
      );
      if (typeof response !== "string") {
        const cartitem = response.cart;

        const userdata: UserData = {
          name: response.name,
          profilePic: response.profilePic,
          username: response.username,
          password: response.password,
          email: response.email,
          cart: cartitem,
            favorites: {
                email: response.email,
                favoriteitems: [],
            }
        };
        console.log(response, "response");
        console.log(userdata, "userdata");
        login(userdata);
        Navigate("/home");
        console.log(user, "user");
      } else {
        window.alert("Registration Failed");
        console.log(response, "response from RegisterPage");
      }
    } catch (e: any) {
      window.alert(e);
      console.log(e);
    }
  };

  return (
    <div className="flex justify-center items-center h-auto">
      <div className="bg-[#ffffff] rounded px-8 pt-6 pb-8 mb-4 min-w-[30vw]">
        <h2 className="text-2xl font-bold mb-4 text-black">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-black text-sm font-bold mb-2"
              htmlFor="email"
            >
              Name:
            </label>
            <input
              className="w-full bg-[#f2f6f9] py-2 px-3 rounded-full"
              id="name"
              type="text"
              value={name}
              placeholder="Name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-black text-sm font-bold mb-2"
              htmlFor="email"
            >
              Username:
            </label>
            <input
              className="w-full bg-[#f2f6f9] py-2 px-3 rounded-full"
              id="username"
              type="text"
              value={username}
              placeholder="Username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
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
              required
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
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-row justify-between items-center">
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="/login"
            >
              Already have an
              <br />
              account? Login
            </a>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
