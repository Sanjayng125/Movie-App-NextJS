"use client";
import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const NavbarItem = ({ title, param }: { title: string; param: string }) => {
  const searchParams = useSearchParams();
  const genre = searchParams.get("genre");
  return (
    <div>
      <Link
        href={`/?genre=${param}`}
        className={`m-4 hover:text-amber-600 font-semibold p-2 ${
          genre &&
          genre === param &&
          "underline underline-offset-8 decoration-4 decoration-white rounded-lg"
        }`}
      >
        {title}
      </Link>
    </div>
  );
};

export default NavbarItem;
