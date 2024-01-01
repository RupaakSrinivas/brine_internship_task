/* eslint-disable @typescript-eslint/no-unused-vars */
import { useUser } from "../context";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import "../styles/Navbar.css";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useUser();
  const { name, email, profilePic } = user || {};
  const [showProfile, setShowProfile] = useState(false);
  const Navigate = useNavigate();

  const handleShowProfile = () => {
    setShowProfile(!showProfile);
  };

  //disable scroll when profile is open
  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      if (showProfile) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "auto";
      }
    }
  }, [showProfile]);

  const logOut = () => {
    logout();
    console.log(user);
    localStorage.removeItem("user");
    localStorage.clear();
    // handleShowProfile();
    // window.location.reload();
  };

  return (
    <>
      <div className="fixed flex bg-[#0478ee] text-white justify-around w-full h-auto items-center">
        <div className="ml-4 py-3 text-2xl font-bold">ShopKart</div>
        <div className="flex flex-row justify-around items-center">
          <p
            className={`mr-4 hover:cursor-pointer text-white ${
              user ? "block" : "hidden"
            }`}
            onClick={() => Navigate("/home")}
          >
            Products
          </p>
          <p
            className={`mr-4 hover:cursor-pointer text-white ${
              user ? "block" : "hidden"
            }`}
            onClick={logOut}
          >
            logout
          </p>
          <a
            className={`mr-4 hover:cursor-pointer text-white ${
              user ? "hidden" : "block"
            }`}
            href="/login"
          >
            Login
          </a>
          <div className="w-fit flex gap-1">
            <FaShoppingCart
              className="h-6 w-auto hover:cursor-pointer text-white"
              onClick={() => Navigate("/cart")}
            />
            <p className="text-sm text-white bg-red-600 rounded-full p-0 ">{user?.cart?.items.length}</p>
          </div>
          {/* <div
            className={`flex items-center hover:cursor-pointer ${
              user ? "block" : "hidden"
            }`}
            onClick={handleShowProfile}
          >
            <img
              className="h-10 w-10 rounded-full"
              src={
                profilePic ||
                "https://i.pinimg.com/736x/e5/9e/51/e59e51dcbba47985a013544769015f25.jpg"
              }
              alt="Profile Pic"
            />
          </div> */}
        </div>
      </div>
      <span className={`${showProfile ? "block" : "hidden"}`}>
        <div className="modal" onClick={handleShowProfile}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Profile</h3>
              <FaTimes onClick={handleShowProfile} />
            </div>
            <div className="modal-body">
              {name !== null && (
                <div className="modal-message">
                  <span>Name:</span> {name}
                </div>
              )}
              <div className="modal-message">
                <span>Email:</span> {email}
              </div>
              <div className="modal-buttons">
                <button className="modal-yes" onClick={logOut}>
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </span>
    </>
  );
}
