"use client";
import React from "react";
import Card from "./Card";
import { Movie } from "@/types";

const Results = ({ results }: { results: Movie[] }) => {
  return (
    <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mx-auto p-4">
      {results && results.map((result, i) => <Card key={i} result={result} />)}
    </div>
  );
};

export default Results;
