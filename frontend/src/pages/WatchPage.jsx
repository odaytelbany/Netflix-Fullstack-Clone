import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useContentStore } from "../store/content";
import Navbar from "../components/Navbar";
import axios from "axios";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Loader,
  PlusIcon,
} from "lucide-react";
import ReactPlayer from "react-player";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants";
import WatchPageSkeleton from "../components/skeletons/WatchPageSkeleton";
import { formatDate } from "../utils/formatDate";
import useGetContentCredits from "../hooks/useGetContentCredits";
import useGetImages from "../hooks/useGetImages";
import ImageViewer from "../components/ImageViewer";
import toast from "react-hot-toast";
import { getTvAirDate } from "../utils/getTvAirDate";
import { getRunTime } from "../utils/getRunTime";

const WatchPage = () => {
  const { id } = useParams();
  const { allCredits } = useGetContentCredits(id);
  const { allImages } = useGetImages(id);
  const [trailers, setTrailers] = useState([]);
  const [isInWatchList, setIsInWatchList] = useState(false);
  const [isInWatchListLoading, setIsInWatchListLoading] = useState(false);
  const [similarContent, setSimilarContent] = useState([]);
  const [currentTrailerIndex, setCurrentTrailerIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({});
  const { contentType } = useContentStore();

  const creditsSliderRef = useRef(null);
  const similarSliderRef = useRef(null);

  useEffect(() => {
    const getTrailers = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
        setTrailers(res.data.data.trailers);
      } catch (err) {
        if (err.message.includes("404")) {
          setTrailers([]);
        }
      }
    };

    getTrailers();
  }, [contentType, id]);

  useEffect(() => {
    const getIsInWatchList = async () => {
      try {
        const res = await axios.get(`/api/v1/watchList/${id}`);
        setIsInWatchList(res.data.data);
      } catch (err) {
        if (err.message.includes("404")) {
          setIsInWatchList(false);
        }
      }
    };

    getIsInWatchList();
  }, [contentType, id]);

  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
        setSimilarContent(res.data.data.similar);
      } catch (err) {
        if (err.message.includes("404")) {
          setSimilarContent([]);
        }
      }
    };

    getSimilarContent();
  }, [contentType, id]);

  useEffect(() => {
    const getContentDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
        setContent(res.data.data.details);
      } catch (err) {
        if (err.message.includes("404")) {
          try {
            const res = await axios.get(
              `/api/v1/${
                contentType === "movie" ? "tv" : "movie"
              }/${id}/details`
            );
            setContent(res.data.data.details);
          } catch (error) {
            console.log("Error fetching content details:", error);
            setContent(null);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    getContentDetails();
  }, [contentType, id]);

  const handlePrev = () => {
    if (currentTrailerIndex > 0)
      setCurrentTrailerIndex(currentTrailerIndex - 1);
  };
  const handleNext = () => {
    if (currentTrailerIndex < trailers.length - 1)
      setCurrentTrailerIndex(currentTrailerIndex + 1);
  };

  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: -(ref.current.offsetWidth * 0.75),
        behavior: "smooth",
      });
    }
  };
  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: +(ref.current.offsetWidth * 0.75),
        behavior: "smooth",
      });
    }
  };

  const handleWatchList = async (item) => {
    if (isInWatchList) {
      try {
        setIsInWatchListLoading(true);
        await axios.delete(`/api/v1/watchList/${item.id}`);
        setIsInWatchList(false);
        setIsInWatchListLoading(false);
        toast.success("Removed from watchlist");
      } catch (error) {
        console.log("Error removing from watchlist:", error);
        toast.error("Error removing from watchlist");
      }
    } else {
      try {
        setIsInWatchListLoading(true);
        await axios.post("/api/v1/watchList", {
          ...item,
          media_type: contentType,
        });
        setIsInWatchList(true);
        setIsInWatchListLoading(false);
        toast.success("Added to watchlist");
      } catch (error) {
        console.log("Error adding to watchlist:", error);
        toast.error("Error adding to watchlist");
      }
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-black p-10">
        <WatchPageSkeleton />
      </div>
    );

  if (!content) {
    return (
      <div className="bg-black text-white h-screen">
        <div className="max-w-6xl mx-auto">
          <Navbar />
          <div className="text-center mx-auto px-4 py-8 h-full mt-40">
            <h2 className="text-2xl sm:text-5xl font-bold text-balance">
              Content not found !
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="mx-auto container px-4 py-8 h-full">
        <Navbar />
        {trailers.length > 0 && (
          <div className="flex justify-between items-center mb-4">
            <button
              className={`bg-gray-500/70 hover:bg-gray-500  text-white py-2 px-4 rounded 
                            ${
                              currentTrailerIndex === 0
                                ? "opacity-50 cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
              disabled={currentTrailerIndex === 0}
              onClick={handlePrev}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className={`bg-gray-500/70 hover:bg-gray-500  text-white py-2 px-4 rounded 
                            ${
                              currentTrailerIndex === trailers.length - 1
                                ? "opacity-50 cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
              disabled={currentTrailerIndex === trailers.length - 1}
              onClick={handleNext}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        <div className="aspect-video mb-8 py-2 sm:px-10 md:px-32">
          {trailers.length > 0 && (
            <ReactPlayer
              controls={true}
              width={"100%"}
              height={"70vh"}
              className="mx-auto overflow-hidden rounded-lg"
              url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIndex].key}`}
            />
          )}
          {trailers.length === 0 && (
            <h2 className="text-xl text-center mt-5">
              No Trailers Avilable for{" "}
              <span className="font-bold text-red-600">
                {content?.title || content?.name}
              </span>
            </h2>
          )}
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-20 max-w-6xl mx-auto">
          <div className="mb-4 md:mb-0">
            <div className="flex flex-col-reverse gap-4 md:flex-row md:items-center justify-between">
              <div className="flex flex-col gap-2">
                {contentType === "tv" && (
                  <Link to={`/watch/${id}/Episodes?title=${content?.name || content?.title}&&seasons=${content.
                    number_of_seasons}`} className="flex items-center gap-3 cursor-pointer group">
                    <p className="font-bold group-hover:underline">Episode guide</p>
                    <p className="flex items-center">{content.number_of_episodes} <ChevronRight className="size-5 group-hover:text-red-600"/></p>
                    
                  </Link>
                )}
                <h2 className="text-5xl font-bold text-balance">
                  {content?.title || content?.name}
                </h2>
              </div>
              <button
                onClick={() => handleWatchList(content)}
                className={`flex self-center items-center gap-1 bg-gray-700 rounded-3xl px-4 py-2 hover:bg-gray-800 cursor-pointer ${
                  isInWatchList ? "bg-red-700 hover:bg-red-800" : ""
                }`}
              >
                {isInWatchListLoading ? (
                  <Loader className="text-white size-5 animate-spin" />
                ) : (
                  <>
                    {isInWatchList ? (
                      <Check size={18} />
                    ) : (
                      <PlusIcon size={18} />
                    )}{" "}
                    Watchlist
                  </>
                )}
              </button>
            </div>
            <p className="mt-2 text-lg">
              {contentType === "movie"
                ? formatDate(content?.release_date || content?.first_air_date)
                : getTvAirDate(content)}{" "}
              |{" "}
              {contentType === "movie"
                ? getRunTime(content?.runtime)
                : `${content.number_of_episodes} eps`}{" "}
              |{" "}
              {content?.adult ? (
                <span className="text-red-600">18+</span>
              ) : (
                <span className="text-green-600">PG-13</span>
              )}
            </p>
            <p className="mt-4 text-lg">{content?.overview}</p>
          </div>
          <img
            src={ORIGINAL_IMG_BASE_URL + content?.poster_path}
            alt="Poster image"
            className="rounded-md max-h-[600px]"
          />
        </div>

        {allImages.length > 0 && <ImageViewer images={allImages} />}

        {allCredits.length > 0 && (
          <div className="mt-12 max-w-5xl mx-auto relative">
            <h3 className="text-3xl font-bold mb-4">The Cast</h3>
            <div
              className="flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group"
              ref={creditsSliderRef}
            >
              {allCredits.map((content) => {
                if (content?.profile_path === null) return null;
                return (
                  <Link
                    to={`/person/${content?.id}/details`}
                    key={content?.id}
                    className="w-52 flex-none"
                  >
                    <img
                      src={SMALL_IMG_BASE_URL + content?.profile_path}
                      alt="profile image"
                      className="w-full h-auto rounded-md"
                    />
                    <h4 className="mt-2 text-lg font-semibold">
                      {content?.name}
                    </h4>
                    <h6 className="mt-0.5 text-sm text-gray-400">
                      {content?.character}
                    </h6>
                  </Link>
                );
              })}

              <ChevronLeft
                className="absolute top-1/2 -translate-y-1/2 left-2 size-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 text-white rounded-full"
                onClick={() => scrollLeft(creditsSliderRef)}
              />
              <ChevronRight
                className="absolute top-1/2 -translate-y-1/2 right-2 size-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 text-white rounded-full"
                onClick={() => scrollRight(creditsSliderRef)}
              />
            </div>
          </div>
        )}

        {similarContent.length > 0 && (
          <div className="mt-12 max-w-5xl mx-auto relative">
            <h3 className="text-3xl font-bold mb-4">
              Similar Movies / TV Shows
            </h3>
            <div
              className="flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group"
              ref={similarSliderRef}
            >
              {similarContent.map((similarItem) => {
                if (similarItem?.poster_path === null) return null;
                return (
                  <Link
                    to={`/watch/${similarItem?.id}`}
                    key={similarItem?.id}
                    className="w-52 flex-none"
                  >
                    <img
                      src={SMALL_IMG_BASE_URL + similarItem?.poster_path}
                      alt="poster"
                      className="w-full h-auto rounded-md"
                    />
                    <h4 className="mt-2 text-lg font-semibold">
                      {similarItem?.title || similarItem?.name}
                    </h4>
                  </Link>
                );
              })}

              <ChevronLeft
                className="absolute top-1/2 -translate-y-1/2 left-2 size-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 text-white rounded-full"
                onClick={() => scrollLeft(similarSliderRef)}
              />
              <ChevronRight
                className="absolute top-1/2 -translate-y-1/2 right-2 size-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 text-white rounded-full"
                onClick={() => scrollRight(similarSliderRef)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchPage;
