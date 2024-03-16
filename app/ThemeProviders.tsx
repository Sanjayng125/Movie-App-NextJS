"use client";
import { ThemeProvider } from "next-themes";
import React from "react";

const ThemeProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <div className="dark:text-gray-200 dark:bg-gray-700 transition-colors duration-300 min-h-screen select-none">
        {children}
      </div>
    </ThemeProvider>
  );
};

export default ThemeProviders;
