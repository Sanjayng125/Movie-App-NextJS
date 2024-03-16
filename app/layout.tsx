import Header from "@/components/Header";
import "./globals.css";
import ThemeProviders from "@/app/ThemeProviders";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import { Suspense } from "react";

export const metadata = {
  title: "IMDB Clone",
  description: "Know about your favourite movies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Suspense>
          <ThemeProviders>
            <Header />
            <Navbar />
            <SearchBar />
            <main>{children}</main>
          </ThemeProviders>
        </Suspense>
      </body>
    </html>
  );
}
