"use client";
import { getPersonDetails, getPersonMovies } from "@/app/api";
import Loading from "@/app/loading";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import fallBackImage from "../../../public/images/profile.png";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { FaChartSimple } from "react-icons/fa6";
import Card from "@/components/Card";
import { Movie, MovieCast } from "@/types";

const PersonPage = ({ params }: { params: { id: string } }) => {
  const person_id = params.id;
  const [personDetails, setPersonDetails] = useState<MovieCast>();
  const [personMovies, setPersonMovies] = useState<Movie[]>();
  const [loading, setLoading] = useState(false);

  const fetchPersonData = async () => {
    setLoading(true);
    const res = await getPersonDetails(person_id);
    // console.log(res);
    setPersonDetails(res);
    setLoading(false);
  };

  const fetchPersonMovies = async () => {
    setLoading(true);
    const res = await getPersonMovies(person_id);
    // console.log(res);
    setPersonMovies(res);
    setLoading(false);
  };

  useEffect(() => {
    if (person_id) {
      fetchPersonData();
      fetchPersonMovies();
    }
  }, [person_id]);

  return (
    <div className="personBg w-full p-3 flex flex-col items-center gap-2">
      {loading && <Loading />}
      {personDetails && (
        <>
          <Image
            src={
              personDetails.profile_path !== null &&
              personDetails.profile_path !== undefined
                ? `https://image.tmdb.org/t/p/original/${personDetails.profile_path}`
                : fallBackImage
            }
            width={250}
            height={250}
            alt="movie image"
            className="group-hover:opacity-80 transition duration-200 rounded-full max-w-[250px] max-h-[250px] border-2 border-black dark:border-white"
            // style={{ maxWidth: "100%", height: "auto", maxHeight: "300px" }}
          ></Image>
          {personDetails.name && (
            <h2 className="text-3xl font-bold">{personDetails.name}</h2>
          )}
          <div className="w-full mt-5 border-t-2 pt-3">
            {personDetails.popularity && (
              <h3 className="text-lg font-semibold flex items-center gap-1">
                Popularity: {personDetails.popularity} <FaChartSimple />
              </h3>
            )}
            {personDetails.birthday && (
              <h3 className="text-lg font-semibold">
                Birthday: {personDetails.birthday}
              </h3>
            )}
            {personDetails.place_of_birth && (
              <h3 className="text-lg font-semibold">
                From: {personDetails.place_of_birth}
              </h3>
            )}
          </div>
          {/* <p>{personDetails.biography}</p> */}
          {personDetails.biography && (
            <p className="break-all flex flex-col font-medium">
              <span className="text-lg font-semibold">Biography:</span>
              {personDetails.biography.length > 500 ? (
                <>
                  <span id="desc">
                    {personDetails.biography.substring(0, 450)}...
                  </span>
                  <button
                    id="moreBtn"
                    onClick={() => {
                      const bio = document.getElementById(
                        "desc"
                      ) as HTMLElement;
                      bio.innerText = personDetails.biography || "";
                      const moreBtn = document.getElementById(
                        "moreBtn"
                      ) as HTMLButtonElement;
                      moreBtn.style.display = "none";
                      const lessBtn = document.getElementById(
                        "lessBtn"
                      ) as HTMLButtonElement;
                      lessBtn.style.display = "flex";
                    }}
                    className="w-max font-semibold flex items-center gap-2 hover:underline"
                  >
                    More <FaArrowDown />
                  </button>
                  <button
                    id="lessBtn"
                    onClick={() => {
                      const bio = document.getElementById(
                        "desc"
                      ) as HTMLElement;
                      bio.innerText = personDetails.biography || "";
                      bio.innerText =
                        personDetails?.biography?.substring(0, 450) + "..." ||
                        "";
                      const lessBtn = document.getElementById(
                        "lessBtn"
                      ) as HTMLButtonElement;
                      lessBtn.style.display = "none";
                      const moreBtn = document.getElementById(
                        "moreBtn"
                      ) as HTMLButtonElement;
                      moreBtn.style.display = "flex";
                    }}
                    className="w-max font-semibold ml-2 hidden items-center gap-2 hover:underline"
                  >
                    Less <FaArrowUp />
                  </button>
                </>
              ) : (
                <>{personDetails.biography}</>
              )}
            </p>
          )}
          {personMovies && (
            <div className="mt-5">
              <h2 className="text-2xl font-bold">Movies:</h2>
              <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mx-auto p-4">
                {personMovies &&
                  personMovies.map((personMovie, i) => (
                    <Card result={personMovie} key={i} />
                  ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PersonPage;
