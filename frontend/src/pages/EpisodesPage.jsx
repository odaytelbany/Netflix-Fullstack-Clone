import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants";
import { formatDate } from "../utils/formatDate";

const EpisodesPage = () => {
  const { id } = useParams();
  const { searchParams } = new URL(document.location);
  const episodeTitle = searchParams.get("title");
  const number_of_seasons = searchParams.get("seasons");
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [episodes, setEpisodes] = useState([]);
  console.log(episodes);
  useEffect(() => {
    const getEpisodes = async () => {
      const response = await axios.get(
        `/api/v1/tv/${id}/season/${selectedSeason}`
      );
      setEpisodes(response.data.data);
    };

    getEpisodes();
  }, [id, selectedSeason]);

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="h-full container px-4 py-8 mx-auto">
        <Navbar />
        <div className="max-w-6xl py-8 px-4 mx-auto">
          <h1 className="text-xl font-bold text-gray-300">{episodeTitle}</h1>
          <h1 className="text-3xl font-bold mb-6">Episode List</h1>
          <div className="flex gap-1 mb-6">
            {[...Array(Number(number_of_seasons))].map((_, index) => {
              return (
                <div
                  key={index}
                  className={`flex items-center justify-center rounded-full size-12 ${
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
          <div className="flex flex-col gap-4">
            {episodes.map((episode, index) => {
              return (
                <div
                  key={episode?.id}
                  className={`flex row gap-4 pb-8 ${
                    index + 1 < episodes.length
                      ? "border-b border-gray-800"
                      : ""
                  }`}
                >
                  <img
                    src={SMALL_IMG_BASE_URL + episode?.still_path}
                    alt={episode?.name}
                    className="rounded-lg h-32"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <h1 className="text-lg font-bold">
                        S{episode?.season_number}.E{episode?.episode_number} ∙{" "}
                        {episode?.name}
                      </h1>
                      <p className="text-gray-300">
                        {formatDate(episode?.air_date)}
                      </p>
                    </div>
                    <div>{episode?.overview}</div>
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
