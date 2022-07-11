import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../AppProvider";
const Navbar = () => {
  const { user, logOut } = useAppContext();

  const handleLogout = () => {
    try {
      logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-between px-3 sm:px-5 py-3 z-[100] w-full absolute top-0 left-0 right-0">
      <Link to="/">
        <h1 className="text-red-700 text-4xl font-bold cursor-pointer">
          NETFLIX
        </h1>
      </Link>
      {user.email ? (
        <div>
          <Link to="/account">
            <button className="text-white pr-3 sm:pr-4 ">Account</button>
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-600 px-2 sm:px-6 py-2 rounded cursor-pointer text-white"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button className="text-white pr-4 hidden sm:inline-block">
              Sign In
            </button>
          </Link>

          <Link to="/signup">
            <button className=" bg-red-600 px-6 py-2 rounded cursor-pointer text-white">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
