import React from "react";
import MenuItem from "./MenuItem";
import { FaHome, FaInfoCircle } from "react-icons/fa";
import Link from "next/link";
import DarkMode from "./DarkMode";

const Header = () => {
  return (
    <>
      <div className="flex justify-between mx-2 max-w-5xl sm:mx-auto items-center py-6">
        <div className="flex">
          <MenuItem title={"Home"} address={"/"} Icon={FaHome} />
          <MenuItem title={"About"} address={"/about"} Icon={FaInfoCircle} />
        </div>
        <div className="flex items-center space-x-5">
          <DarkMode />
          <Link href="/">
            <h2 className="text-2xl mx-2">
              <span className="font-bold bg-amber-500 py-1 px-2 rounded-lg">
                IMDB
              </span>
              <span className="text-xl hidden sm:inline">Clone</span>
            </h2>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
