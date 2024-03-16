"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AiFillHeart } from "react-icons/ai";
import movieFallBackImage from "../public/images/movieFallbackImg.jpg";
import { Movie } from "@/types";

const Card = ({ result }: { result: Movie }) => {
  return (
    <div className="cursor-pointer sm:p-3 sm:hover:shadow-slate-400 sm:shadow-md rounded-lg sm:border sm:border-slate-400 group sm:m-2 transition-shadow duration-200">
      <Link href={`/movie/${result?.id}`}>
        <Image
          src={
            (result?.backdrop_path || result?.poster_path) !== null &&
            (result?.backdrop_path || result?.poster_path) !== undefined
              ? `https://image.tmdb.org/t/p/original/${
                  result.backdrop_path || result.poster_path
                }`
              : movieFallBackImage
          }
          width={500}
          height={300}
          alt="movie image"
          className="sm:rounded-t-lg group-hover:opacity-80 transition duration-200"
          style={{ maxWidth: "100%", height: "auto", maxHeight: "180px" }}
        ></Image>
        <div className="p-2">
          {result?.overview && <p>{result.overview.substring(0, 60)}</p>}
          <h2 className="text-lg font-bold">{result.title || result.name}</h2>
          <p className="flex items-center">
            {result.first_air_date || result.release_date}
            <AiFillHeart className="text-red-500 ml-3" /> {result.vote_count}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
