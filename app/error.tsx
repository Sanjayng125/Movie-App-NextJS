"use client";
import React, { useEffect } from "react";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  useEffect(() => {
    console.log(error);
  }, [error]);
  return (
    <div className="text-center mt-10">
      <h1>Something went wrong!</h1>
      <button onClick={() => reset()} className="hover:text-amber-600">
        Try again
      </button>
    </div>
  );
};

export default Error;
