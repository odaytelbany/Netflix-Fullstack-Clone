import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, LogOut, Menu } from "lucide-react";
import { useAuthStore } from "../store/authUser";
import { useContentStore } from "../store/content";
const Navbar = () => {
  const { user, logout } = useAuthStore();
  const { setContentType } = useContentStore();
  const [menuShown, setMenuShown] = useState(false);
  const toggleMobileMenu = () => setMenuShown(!menuShown);
  return (
    <header className="max--6xl mx-auto flex flex-wrap items-center justify-between h-20 p-4">
      <div className="flex items-center gap-10 z-50">
        <Link to={"/"}>
          <img
            src="/netflix-logo.png"
            alt="netflix logo"
            className="w-32 sm:w-40"
          />
        </Link>
        <div className="hidden sm:flex gap-2 items-center">
          <Link
            to="/"
            onClick={() => setContentType("movie")}
            className="hover:underline"
          >
            Movies
          </Link>
          <Link
            to="/"
            onClick={() => setContentType("tv")}
            className="hover:underline"
          >
            TV Shows
          </Link>
          <Link to="/history" className="hover:underline">
            Search History
          </Link>
        </div>
      </div>
      <div className="flex gap-2 items-center z-50">
        <Link to={"/search"}>
          <Search className="size-6 cursor-pointer" />
        </Link>
        <img
          src={`${user.image}.png`}
          alt="avatar"
          className="h-8 rounded cursor-pointer"
        />
        <LogOut className="size-6 cursor-pointer" onClick={logout} />
        <div className="sm:hidden">
          <Menu className="size-6 cursor-pointer" onClick={toggleMobileMenu} />
        </div>
      </div>
      {/* mobile nav bar  */}
      {menuShown && (
        <div className="w-full bg-black rounded border border-gray-800 mt-4 z-50 sm:hidden">
          <Link
            to={"/"}
            className="block hover:underline p-2"
            onClick={() => {
              toggleMobileMenu();
              setContentType("movie");
            }}
          >
            Movies
          </Link>
          <Link
            to={"/"}
            className="block hover:underline p-2"
            onClick={() => {
              toggleMobileMenu();
              setContentType("tv");
            }}
          >
            TV Shows
          </Link>
          <Link
            to={"/history"}
            className="block hover:underline p-2"
            onClick={toggleMobileMenu}
          >
            Search History
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
