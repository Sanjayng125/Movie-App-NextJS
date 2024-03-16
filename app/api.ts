"use server"
// const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const apiKey = process.env.API_KEY;
const baseUrl = `https://api.themoviedb.org/3`;
import { unstable_noStore as noStore } from "next/cache";

export const getMovieDetails = async (movie_id: string) => {
    noStore()
    try {
        const res = await fetch(`${baseUrl}/movie/${movie_id}?api_key=${apiKey}`);
        const movie = await res.json();
        return movie;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getTrending = async () => {
    noStore()
    try {
        const res = await fetch(
            `${baseUrl}/trending/movie/week?api_key=${apiKey}`,
            {
                next: { revalidate: 10000 },
            }
        );
        const data = await res.json();
        const movies = await data?.results;
        // console.log(movies);
        return movies;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getTopRated = async () => {
    noStore()
    try {
        const res = await fetch(`${baseUrl}/movie/top_rated?api_key=${apiKey}`, {
            next: { revalidate: 10000 },
        });
        const data = await res.json();
        const movies = await data?.results;
        return movies;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getUpcoming = async () => {
    noStore()
    try {
        const res = await fetch(`${baseUrl}/movie/upcoming?api_key=${apiKey}`);
        const data = await res.json();
        const movies = await data?.results;
        return movies;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getSimilar = async (movie_id: string) => {
    noStore()
    try {
        const res = await fetch(
            `${baseUrl}/movie/${movie_id}/similar?api_key=${apiKey}&page=1`
        );
        const data = await res.json();
        const movies = await data?.results;
        return movies;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getPersonDetails = async (person_id: string) => {
    noStore()
    try {
        const res = await fetch(`${baseUrl}/person/${person_id}?api_key=${apiKey}`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getPersonMovies = async (person_id: string) => {
    noStore()
    try {
        const res = await fetch(
            `${baseUrl}/person/${person_id}/movie_credits?api_key=${apiKey}`
        );
        const data = await res.json();
        const movies = await data?.cast.splice(0, 20);
        return movies;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getMovieCasts = async (movie_id: string) => {
    noStore()
    try {
        const res = await fetch(
            `${baseUrl}/movie/${movie_id}/credits?api_key=${apiKey}`
        );
        const data = await res.json();
        const casts = await data?.cast;
        return casts;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getSearchMovies = async (query: string, page: number) => {
    noStore()
    try {
        const res = await fetch(
            (query !== "" || !query)
                ? `${baseUrl}/search/movie?query=${query}&page=${page}&api_key=${apiKey}`
                : `${baseUrl}/trending/movie/week?api_key=${apiKey}`
        );
        const data = await res.json();
        const movies = await data?.results;
        const totalPages = await data?.total_pages;
        const totalResults = await data?.total_results;
        return { movies, totalPages, totalResults };
    } catch (error) {
        console.log(error);
        return null;
    }
};