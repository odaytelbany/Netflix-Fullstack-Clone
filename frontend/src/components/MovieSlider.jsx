import React, { useEffect, useRef, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MovieSlider = ({ category, genre }) => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showArrows, setShowArrows] = useState(false);
  const { contentType } = useContentStore();
  const sliderRef = useRef(null);

  const formatedCategory =
    category?.replaceAll("_", " ")[0].toUpperCase() +
      category?.replaceAll("_", " ").slice(1) ||
    genre?.name?.replaceAll("_", " ")[0].toUpperCase() +
      genre?.name?.replaceAll("_", " ").slice(1);

  const formatedContentType = contentType === "movie" ? "Movies" : "TV Shows";

  useEffect(() => {
    if (genre && !category) {
      const getContent = async () => {
        setLoading(true);
        const res = await axios.get(`/api/v1/${contentType}/genre/${genre.id}`);
        setContent(res.data.data);
        setLoading(false);
      };
      getContent();
      return;
    } else if (category && !genre) {
      const getContent = async () => {
        setLoading(true);
        const res = await axios.get(`/api/v1/${contentType}/${category}`);
        setContent(res.data.data);
        setLoading(false);
      };
      getContent();
      return;
    }
  }, [contentType, category, genre]);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -(sliderRef.current.offsetWidth * 0.75),
        behavior: "smooth",
      });
    }
  };
  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: +(sliderRef.current.offsetWidth * 0.75),
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return (
      <div className="bg-black text-white relative px-5 md:px-20">
        <h2 className="mb-4 text-2xl font-bold">{formatedCategory}</h2>
        <div className="flex space-x-4 overflow-x-scroll scrollbar-hide">
          <div className="min-w-[250px] animate-pulse bg-gray-700 rounded-lg h-40"></div>
          <div className="min-w-[250px] animate-pulse bg-gray-700 rounded-lg h-40"></div>
          <div className="min-w-[250px] animate-pulse bg-gray-700 rounded-lg h-40"></div>
          <div className="min-w-[250px] animate-pulse bg-gray-700 rounded-lg h-40"></div>
          <div className="min-w-[250px] animate-pulse bg-gray-700 rounded-lg h-40"></div>
          <div className="min-w-[250px] animate-pulse bg-gray-700 rounded-lg h-40"></div>
          <div className="min-w-[250px] animate-pulse bg-gray-700 rounded-lg h-40"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-black text-white relative px-5 md:px-20"
      onMouseLeave={() => setShowArrows(false)}
      onMouseEnter={() => setShowArrows(true)}
    >
      <h2 className="mb-4 text-2xl font-bold">
        {formatedCategory} {formatedContentType}
      </h2>
      <div
        className="flex space-x-4 overflow-x-scroll scrollbar-hide"
        ref={sliderRef}
      >
        {content?.map((item) => {
          if (!item.backdrop_path) return null;
          return (
            <Link
              key={item.id}
              to={`/watch/${item.id}`}
              className="min-w-[250px] relative group "
            >
              <div className="rounded-lg overflow-hidden">
                <img
                  src={SMALL_IMG_BASE_URL + item.backdrop_path}
                  alt="Movie image"
                  className="transition-transform duration-300 ease-in-out group-hover:scale-125"
                />
              </div>
              <p className="mt-2 text-center">{item.title || item.name}</p>
            </Link>
          )
        })}
      </div>
      {showArrows && (
        <>
          <button
            className="absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center size-12 rounded-full bg-black/50 hover:bg-black/75 text-white z-10"
            onClick={scrollLeft}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center size-12 rounded-full bg-black/50 hover:bg-black/75 text-white z-10"
            onClick={scrollRight}
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
};

export default MovieSlider;
