import React, { useState } from "react";
import { useContentStore } from "../store/content";
import Navbar from "../components/Navbar";
import { History, Search } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";

const SearchPage = () => {
  const [activeTap, setActiveTap] = useState("multi");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const { setContentType } = useContentStore();

  const handleTabClick = (tab) => {
    setActiveTap(tab);
    tab === "movie" ? setContentType("movie") : setContentType("tv");
    setResults([]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/v1/search/${activeTap}/${searchTerm}`);
      setResults(res.data.data);
    } catch (error) {
      if (error.response.status === 404) {
        toast.error("Nothing Found!");
      } else {
        toast.error("An Error Occurred!");
      }
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center gap-3 mb-4">
          <button
            className={`py-2 px-4 rounded ${
              activeTap === "multi" ? "bg-red-600" : "bg-gray-800"
            } hover:bg-red-700 cursor-pointer`}
            onClick={() => handleTabClick("multi")}
          >
            Multi
          </button>
          <button
            className={`py-2 px-4 rounded ${
              activeTap === "movie" ? "bg-red-600" : "bg-gray-800"
            } hover:bg-red-700 cursor-pointer`}
            onClick={() => handleTabClick("movie")}
          >
            Movies
          </button>
          <button
            className={`py-2 px-4 rounded ${
              activeTap === "tv" ? "bg-red-600" : "bg-gray-800"
            } hover:bg-red-700 cursor-pointer`}
            onClick={() => handleTabClick("tv")}
          >
            TV Shows
          </button>
          <button
            className={`py-2 px-4 rounded ${
              activeTap === "person" ? "bg-red-600" : "bg-gray-800"
            } hover:bg-red-700 cursor-pointer`}
            onClick={() => handleTabClick("person")}
          >
            Person
          </button>
        </div>

        <form
          className="flex gap-2 items-stretch mb-8 max-w-2xl mx-auto"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={activeTap === "multi" ? "Search for anything" : `Search for a ` + activeTap}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
          <button
            className={`bg-red-600 hover:bg-red-700 text-white p-2 rounded cursor-pointer`}
            type="submit"
          >
            <Search className="size-6" />
          </button>
          <Link
            to={"/history"}
            className={`bg-red-600 hover:bg-red-700 text-white p-2 rounded cursor-pointer`}
          >
            <History className="size-6" />
          </Link>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((result) => {
            if (!result.poster_path && !result.profile_path) return null;

            return (
              <div key={result.id} className="bg-gray-800 p-4 rounded">
                {activeTap === "person" ? (
                  <Link
                    to={`/person/${result.id}/details`}
                    className="flex flex-col items-center"
                  >
                    <img
                      src={ORIGINAL_IMG_BASE_URL + result.profile_path}
                      alt={result.name}
                      className="max-h-96 rounded mx-auto"
                    />
                    <h2 className="mt-2 text-xl font-bold">{result.name}</h2>
                  </Link>
                ) : (
                  <Link
                    to={result?.media_type === "person" ? (`/person/${result.id}/details`) : ("/watch/" + result.id)}
                    onClick={() => {
                      setContentType(result?.media_type || activeTap);
                    }}
                  >
                    <img
                      src={ORIGINAL_IMG_BASE_URL + (result.poster_path || result.profile_path)}
                      alt={result.name || result.title}
                      className="w-full h-auto rounded"
                    />
                    <h2 className="mt-2 text-xl font-bold">
                      {result.name || result.title}
                    </h2>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
