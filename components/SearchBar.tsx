"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="w-full flex justify-center items-center mt-5 gap-3">
      <input
        type="text"
        className="w-3/4 p-3 py-2 rounded-lg border bg-transparent"
        placeholder="Search movies..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Link
        href={`/search?query=${searchQuery}`}
        className="border-2 p-3 rounded-full hover:bg-white hover:text-black hover:border-black"
      >
        <FaSearch />
      </Link>
    </div>
  );
};

export default SearchBar;
