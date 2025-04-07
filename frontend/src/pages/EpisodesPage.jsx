import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants";
import { formatDate } from "../utils/formatDate";
import EpisodesPageSkeleton from "../components/skeletons/EpisodesPageSkeleton";

const EpisodesPage = () => {
  const { id } = useParams();
  const { searchParams } = new URL(document.location);
  const episodeTitle = searchParams.get("title");
  const number_of_seasons = searchParams.get("seasons");
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [episodes, setEpisodes] = useState([]);
  const [episocesLoading, setEpisodesLoading] = useState(true);

  useEffect(() => {
    setEpisodesLoading(true);
    const getEpisodes = async () => {
      try {
        const response = await axios.get(
          `/api/v1/tv/${id}/season/${selectedSeason}`
        );
        setEpisodes(response.data.data);
      } catch (error) {
        console.log("Error fetching episodes", error);
        setEpisodes([]);
      } finally {
        setEpisodesLoading(false);
      }
    };

    getEpisodes();
  }, [id, selectedSeason]);

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="h-full container px-4 py-4 sm:py-8 mx-auto">
        <Navbar />
        <div className="max-w-6xl py-4 sm:py-8 px-2 sm:px-4 mx-auto">
          <h1 className="text-xl font-bold text-gray-300">{episodeTitle}</h1>
          <h1 className="text-3xl font-bold mb-6">Episode List</h1>
          <div className="mb-6 overflow-x-auto scrollbar-hide">
            <div className="flex gap-1 w-max">
              {[...Array(Number(number_of_seasons))].map((_, index) => {
                return (
                  <div
                    key={index}
                    className={`flex items-center justify-center rounded-full w-12 h-12 ${
                      selectedSeason == index + 1
                        ? "bg-red-600"
                        : "hover:bg-gray-800"
                    } cursor-pointer `}
                    onClick={() => setSelectedSeason(index + 1)}
                  >
                    <h1 className="font-bold">{index + 1}</h1>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {episocesLoading && <EpisodesPageSkeleton />}
            {episodes.map((episode, index) => {
              console.log(episode);
              return (
                <div
                  key={episode?.id}
                  className={`flex flex-col md:flex-row gap-4 pb-8 ${
                    index + 1 < episodes.length
                      ? "border-b border-gray-800"
                      : ""
                  }`}
                >
                  {episode?.still_path && (
                    <img
                      src={SMALL_IMG_BASE_URL + episode?.still_path}
                      alt={episode?.name}
                      className="rounded-lg flex-none w-full md:w-auto md:h-32 object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                      <h1 className="text-md sm:text-lg font-bold">
                        S{episode?.season_number}.E{episode?.episode_number} ∙{" "}
                        {episode?.name}
                      </h1>
                      <p className="text-gray-300">
                        {formatDate(episode?.air_date)}
                      </p>
                    </div>
                    <div>
                      {episode?.overview.length > 300
                        ? episode?.overview.slice(0, 300) + "..."
                        : episode?.overview}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodesPage;
