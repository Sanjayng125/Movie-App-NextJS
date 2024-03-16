"use client";
import React, { useState, useEffect, Suspense } from "react";
import { getSearchMovies } from "../api";
import Results from "@/components/Results";
import Loading from "../loading";
import { Movie } from "@/types";
import { useSearchParams } from "next/navigation";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const [movies, setMovies] = useState<Movie[]>();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchSearchMovies = async () => {
    setLoading(true);
    const query = searchParams.get("query") || "";
    const res = await getSearchMovies(query, page);
    setMovies(res?.movies);
    setLoading(false);
  };

  useEffect(() => {
    fetchSearchMovies();
  }, [searchParams]);

  return (
    <Suspense fallback={<Loading />}>
      <div className="w-full">
        {movies && movies?.length > 0 && <Results results={movies} />}
        {!loading && !movies && (
          <h1 className="text-2xl font-semibold text-center mt-3">
            Not Found!...
          </h1>
        )}
        {loading && <Loading />}
      </div>
    </Suspense>
  );
};

export default SearchPage;
