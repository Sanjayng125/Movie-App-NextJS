"use client";
import React from "react";
import Image from "next/image";
import { AiFillHeart } from "react-icons/ai";
import fallBackImage from "../../../public/images/profile.png";
import { getMovieCasts, getMovieDetails, getSimilar } from "@/app/api";
import { useEffect, useState } from "react";
import Link from "next/link";
import Card from "@/components/Card";
import Loading from "@/app/loading";
import { Movie, MovieCast } from "@/types";

const MoviePage = ({ params }: { params: { id: string } }) => {
  const movie_id = params.id;
  const [movie, setMovie] = useState<Movie>();
  const [movieCasts, setMovieCasts] = useState<MovieCast[]>();
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchMovie = async () => {
    setLoading(true);
    const movie = await getMovieDetails(movie_id);
    // console.log(movie);
    setMovie(movie);
    setLoading(false);
  };

  const fetchCasts = async () => {
    const casts = await getMovieCasts(movie_id);
    setMovieCasts(casts);
  };

  const fetchSimilarMovies = async () => {
    const getSimilarMovies = await getSimilar(movie_id);
    setSimilarMovies(getSimilarMovies);
  };

  useEffect(() => {
    if (movie_id) {
      fetchMovie();
      fetchCasts();
      fetchSimilarMovies();
    }
  }, [movie_id]);

  return (
    <div className="w-full">
      {loading && <Loading />}
      {movie === null && !loading && (
        <h2 className="text-center mt-10">Something went wrong!</h2>
      )}
      {movie !== null && !loading && (
        <>
          <div className="p-4 md:pt-8 flex flex-col md:flex-row items-center content-center mx-auto md:space-x-6">
            <Image
              src={`https://image.tmdb.org/t/p/original/${
                movie?.backdrop_path || movie?.poster_path
              }`}
              width={500}
              height={300}
              alt="movie image"
              className="rounded-lg"
              style={{ maxWidth: "100%", height: "100%" }}
            ></Image>
            <div className="p-2">
              <h2 className="text-xl mb-3 font-bold">
                {movie?.title || movie?.name}
              </h2>
              <p className="text-lg mb-3">
                <span className="font-semibold mr-1">Overview:</span>
                {movie?.overview}
              </p>
              <p className="p-2 flex items-center">
                <span className="font-semibold mr-1">Rating:</span>
                <AiFillHeart className="text-red-500" /> {movie?.vote_count}
              </p>
              <p className="p-2">
                <span className="font-semibold mr-1">Release Date:</span>
                {movie?.first_air_date || movie?.release_date}
              </p>
            </div>
          </div>
          <div className="p-4 w-full">
            {movieCasts && movieCasts?.length > 0 && (
              <h2 className="text-2xl font-bold">Casts:</h2>
            )}
            <div className="p-2 m-2 flex overflow-x-auto w-full gap-2">
              {movieCasts &&
                movieCasts?.length > 0 &&
                movieCasts?.map((movieCast, i) => (
                  <Link
                    href={`/person/${movieCast?.id}`}
                    className="flex flex-col items-center gap-2 text-center hover:scale-90 transition-all duration-200"
                    key={i}
                  >
                    <Image
                      src={
                        movieCast?.profile_path !== null &&
                        movieCast?.profile_path !== undefined
                          ? `https://image.tmdb.org/t/p/original/${movieCast?.profile_path}`
                          : fallBackImage
                      }
                      width={100}
                      height={100}
                      alt="cats image"
                      className="rounded-full"
                      style={{ maxWidth: "100px", height: "100px" }}
                    ></Image>
                    <p className="text-sm font-semibold">{movieCast?.name}</p>
                  </Link>
                ))}
            </div>
            {similarMovies.length > 0 && (
              <div className="w-full mt-5">
                <h2 className="text-2xl font-bold">Similar Movies:</h2>
                <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mx-auto p-4">
                  {similarMovies.map((similarMovie, i) => (
                    <Card result={similarMovie} key={i} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MoviePage;
