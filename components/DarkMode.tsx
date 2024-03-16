"use client";
import React, { useEffect, useState } from "react";
import { BsMoonStarsFill } from "react-icons/bs";
import { MdLightMode } from "react-icons/md";
import { useTheme } from "next-themes";

const DarkMode = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [mount, setMount] = useState(false);

  useEffect(() => setMount(true), []);

  return (
    <>
      {mount && currentTheme === "dark" ? (
        <MdLightMode
          onClick={() => setTheme("light")}
          className="cursor-pointer text-xl hover:text-amber-500"
        />
      ) : (
        <BsMoonStarsFill
          onClick={() => setTheme("dark")}
          className="cursor-pointer text-xl hover:text-amber-500"
        />
      )}
    </>
  );
};

export default DarkMode;
