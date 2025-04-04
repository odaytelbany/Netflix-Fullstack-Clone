import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import WatchPageSkeleton from "../components/skeletons/WatchPageSkeleton";
import Navbar from "../components/Navbar";
import { formatDate } from "../utils/formatDate";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useContentStore } from "../store/content";

const PersonPage = () => {
  const { id } = useParams();
  const {setContentType} = useContentStore();
  const sliderRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({});
  const [personCredits, setPersonCredits] = useState();

  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const res = await axios.get(`/api/v1/person/${id}/details`);
        setContent(res.data.data);
      } catch (err) {
        if (err.message.includes("404")) {
          setContent(null);
        }
      } finally {
        setLoading(false);
      }
    };

    getContentDetails();
  }, [id]);

  useEffect(() => {
    const getPersonCredits = async () => {
      try {
        const res = await axios.get(`/api/v1/person/${id}/credits`);
        setPersonCredits(res.data.data.cast);
      } catch (err) {
        if (err.message.includes("404")) {
          setPersonCredits(null);
        }
      }
    }

    getPersonCredits();
  }, [id])

  const getYears = (date) => {
    const currentYear = new Date().getFullYear();
    const birthYear = new Date(date).getFullYear();
    return currentYear - birthYear;
  };

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
    <div className="bg-black text-white min-h-screen">
      <div className="mx-auto container px-4 py-8 h-full">
        <Navbar />

        <div className="flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto mt-8">
          <div className="mb-4 md:mb-0">
            <h2 className="text-5xl font-bold text-balance">{content?.name}</h2>
            <p className="mt-2 text-lg">
              {formatDate(content?.birthday)} | {getYears(content.birthday)}{" "}
              Years
            </p>
            <p className="mt-4 text-lg">{content?.biography}</p>
          </div>
          <img
            src={ORIGINAL_IMG_BASE_URL + content?.profile_path}
            alt="profile image"
            className="rounded-md max-h-[600px]"
          />
        </div>

        {personCredits?.length > 0 && (
          <div className="mt-12 max-w-5xl mx-auto relative">
            <h3 className="text-3xl font-bold mb-4">
              Combined Credits
            </h3>
            <div
              className="flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group"
              ref={sliderRef}
            >
              {personCredits?.map((content) => {
                if (content?.poster_path === null) return null;
                return (
                    <Link
                      to={`/watch/${content?.id}`}
                      onClick={() => setContentType(content?.media_type)}
                      key={`${content?.media_type}-${content?.id}`}
                      className="w-52 flex-none"
                    >
                      <img
                        src={SMALL_IMG_BASE_URL + content?.poster_path}
                        alt="poster"
                        className="w-full h-auto rounded-md"
                      />
                      <h4 className="mt-2 text-lg font-semibold">
                        {content?.title || content?.name}
                      </h4>
                    </Link>
                  )
              })}

              <ChevronLeft
                className="absolute top-1/2 -translate-y-1/2 left-2 size-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 text-white rounded-full"
                onClick={scrollLeft}
              />
              <ChevronRight
                className="absolute top-1/2 -translate-y-1/2 right-2 size-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 text-white rounded-full"
                onClick={scrollRight}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonPage;
