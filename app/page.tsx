"use client";
import Results from "@/components/Results";
import { useEffect, useState, Suspense } from "react";
import { getNowPlaying, getTopRated, getTrending } from "./api";
import Loading from "./loading";
import { Movie } from "@/types";
import { useSearchParams } from "next/navigation";
import { NowPlaying } from "@/components";

export default function Home() {
  const searchParams = useSearchParams();
  const [results, setResults] = useState<Movie[]>();
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>();
  const [loading, setLoading] = useState(false);

  const geNowPlayingMovies = async () => {
    setLoading(true);
    setResults([]);
    const res = await getNowPlaying();
    setNowPlayingMovies(res);
    setLoading(false);
  };

  useEffect(() => {
    geNowPlayingMovies();
  }, []);

  const getMovies = async () => {
    setLoading(true);
    setResults([]);
    const genre = searchParams.get("genre") || "fetchTrending";
    const res = genre === "fetchTopRated" ? getTopRated() : getTrending();
    res.then((movies) => setResults(movies));
    setLoading(false);
  };
  // console.log(results);
  useEffect(() => {
    getMovies();
  }, [searchParams]);

  return (
    <Suspense fallback={<Loading />}>
      <div>
        {loading && <Loading />}
        {!loading && nowPlayingMovies && nowPlayingMovies.length > 0 && (
          <NowPlaying movies={nowPlayingMovies || []} />
        )}
        {!loading && results && results.length > 0 && (
          <>
            <h1 className="py-2 px-4 text-2xl font-bold">
              {searchParams.get("genre") === "fetchTopRated"
                ? "Top Rated:"
                : "Trending:"}
            </h1>
            <Results results={results} />
          </>
        )}
      </div>
    </Suspense>
  );
}
