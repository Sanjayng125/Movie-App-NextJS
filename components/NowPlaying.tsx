"use client";
import React from "react";
import { Movie } from "@/types";
import { Swiper, SwiperSlide } from "swiper/react";
import movieFallBackImage from "../public/images/movieFallbackImg.jpg";
import { AiFillHeart } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./index.css";

// import { EffectCoverflow, Pagination, Navigation } from 'swiper';
import { Navigation, EffectCoverflow, Pagination } from "swiper/modules";

const NowPlaying = ({ movies }: { movies: Movie[] }) => {
  return (
    <div className="container">
      <h1 className="py-2 px-4 text-2xl font-bold text-center">Now Playing</h1>
      <Swiper
        effect={"coverflow"}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          // clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        {movies &&
          movies.map((movie, i) => (
            <SwiperSlide key={i}>
              <Link href={`/movie/${movie?.id}`}>
                <Image
                  src={
                    (movie?.backdrop_path || movie?.poster_path) !== null &&
                    (movie?.backdrop_path || movie?.poster_path) !== undefined
                      ? `https://image.tmdb.org/t/p/original/${
                          movie.backdrop_path || movie.poster_path
                        }`
                      : movieFallBackImage
                  }
                  alt="slide_image"
                  width={500}
                  height={500}
                  className="relative w-full h-full"
                  priority
                />
                <h2 className="absolute text-white bottom-3 font-semibold text-base flex justify-between px-4 w-full">
                  <span>{movie?.title || movie?.name}</span>
                  <span className="flex gap-2 items-center">
                    <AiFillHeart className="text-red-500" /> {movie?.vote_count}
                  </span>
                </h2>
              </Link>
            </SwiperSlide>
          ))}

        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow"></div>
          <div className="swiper-button-next slider-arrow"></div>
          <div className="swiper-pagination mt-5"></div>
        </div>
      </Swiper>
    </div>
  );
};

export default NowPlaying;
