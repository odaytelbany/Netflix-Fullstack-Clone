import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import { useContentStore } from "../store/content";
import { BookmarkCheck, CircleAlert } from "lucide-react";
import toast from "react-hot-toast";
import { getTvAirDate } from "../utils/getTvAirDate";
import { getRunTime } from "../utils/getRunTime";
import WatchListPageSkeleton from "../components/skeletons/WatchListPageSkeleton";

const WatchListPage = () => {
  const { setContentType } = useContentStore();
  const [watchlist, setWatchList] = useState([]);
  const [watchlistLoading, setWatchlistLoading] = useState(true);

  const width = window.innerWidth;  
  const cutLimit = width > 768 ? 300 : 120;
  
  useEffect(() => {
    const getWatchlist = async () => {
      try {
        const res = await axios.get("/api/v1/watchlist");
        setWatchlistLoading(false);
        setWatchList(res.data.data);
      } catch (error) {
        console.log("Error: ", error.message);
        setWatchList([]);
        setWatchlistLoading(false);
      }
    };

    getWatchlist();
  }, []);


  const removeFromWatchlist = async (item) => {
      try {
        await axios.delete(`/api/v1/watchList/${item.id}`);
        setWatchList(watchlist.filter((watch) => watch.id !== item.id));
        toast.success("Removed from watchlist");
      } catch (error) {
        console.log("Error removing from watchlist:", error);
        toast.error("Error removing from watchlist");
      }
  };

  if (watchlistLoading) {
    return (
      <div className="bg-black min-h-screen px-4 md:px-32 py-4">
        <WatchListPageSkeleton />
      </div>
    )
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="max-w-6xl py-8 px-4 mx-auto">
        <h1 className="text-3xl font-bold mb-8">Watchlist</h1>
        <div className="flex flex-col gap-4">
          {watchlist.map((item, index) => {
            return (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-gray-800  p-4 rounded-lg"
              >
                <Link
                  to={`/watch/${item?.id}`}
                  onClick={() => setContentType(item?.media_type)}
                  className="w-24 flex-none hover:opacity-80"
                >
                  <img
                    src={SMALL_IMG_BASE_URL + item.poster_path}
                    alt={item.title}
                    className="rounded-lg"
                  />
                </Link>
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-center">
                    <Link
                      to={`/watch/${item.id}`}
                      onClick={() => setContentType(item?.media_type)}
                      className="text-xl font-bold mb-1 hover:text-gray-300"
                    >
                      {index + 1}. {item?.title || item?.name}
                    </Link>
                    <div className="flex">
                      <button onClick={() => removeFromWatchlist(item)} className="cursor-pointer p-2 rounded-full hover:bg-red-600/60">
                        <BookmarkCheck className="size-6" />
                      </button>
                      <Link to={`/watch/${item.id}`}
                      onClick={() => setContentType(item?.media_type)} className="cursor-pointer p-2 rounded-full hover:bg-red-600/60">
                        <CircleAlert className="size-6" />
                      </Link>
                    </div>
                  </div>
                  <div className="flex gap-4 mb-2">
                    <h4 className="text-gray-300">
                      {item.media_type === "movie"
                        ? item?.release_date.split("-")[0]
                        : getTvAirDate(item)}
                    </h4>
                    <h4 className="text-gray-300">
                      {item?.media_type === "movie"
                        ? `${getRunTime(item?.runtime)}`
                        : `${item.number_of_episodes} eps`}
                    </h4>
                    <h4 className="text-gray-300">
                      {item?.media_type === "movie" ? "Movie" : "TV Show"}
                    </h4>
                  </div>
                  <p>
                    {
                    item?.overview.length > cutLimit
                      ? item?.overview.slice(0, cutLimit) + "..."
                      : item?.overview}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WatchListPage;
