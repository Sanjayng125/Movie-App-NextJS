"use client";
import Results from "@/components/Results";
import { useEffect, useState, Suspense } from "react";
import { getTopRated, getTrending } from "./api";
import Loading from "./loading";
import { Movie } from "@/types";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const [results, setResults] = useState<Movie[]>();
  const [loading, setLoading] = useState(false);

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
        {!loading && results && <Results results={results} />}
        {!loading && !results && (
          <>
            <h1 className="text-2xl font-semibold text-center">
              Something went wrong!
            </h1>
          </>
        )}
      </div>
    </Suspense>
  );
}
