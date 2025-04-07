import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { AlertCircle, Trash } from "lucide-react";
import toast from "react-hot-toast";

const HistoryPage = () => {
  const [searchHistory, setSearchHistory] = useState([]);
  useEffect(() => {
    const getSearchHistory = async () => {
      try {
        const res = await axios.get(`/api/v1/search/history`);
        setSearchHistory(res.data.data);
      } catch (error) {
        console.log(error.message);
        setSearchHistory([]);
      }
    };

    getSearchHistory();
  }, []);

  const handleDelete = async (item) => {
    try {
      await axios.delete(`/api/v1/search/history/${item.id}`);
      toast.success("Item deleted successfully!");
      setSearchHistory(searchHistory.filter((search) => search.id !== item.id));
    } catch {
      toast.error("Faild to delete!")
    }
  }

  const clearHistory = async () => {
    try {
      await axios.delete('/api/v1/search/history')
      setSearchHistory([]);
      toast.success("History Cleared Successfully!")
    } catch {
      toast.error("Failed to clear history!")
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getUTCMonth()];
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    return `${month} ${day}, ${year}`;
  }

  if (searchHistory.length === 0) {
    return (
      <div className="bg-black min-h-screen text-white">
        <Navbar />
        <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">Search History</h1>
          <div className="flex flex-col items-center justify-center h-96 text-gray-400">
            <AlertCircle className="size-16 mb-4" />
            <p className="text-lg">No search history found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold">Search History</h1>
          <button 
            onClick={clearHistory}
            className="flex items-center gap-2 bg-red-600/90 hover:bg-red-700 text-white rounded-lg px-4 py-2 
                     font-medium transition-colors duration-200"
          >
            <Trash className="size-5" />
            <span>Clear All History</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {searchHistory.map((item) => (
            <div
              key={item.id}
              className="group relative bg-gray-800/90 hover:bg-gray-700/80 rounded-lg p-4 transition-all
                         duration-200 ease-out shadow-lg hover:shadow-xl"
            >
              <div className="flex items-start gap-3">
                {item.image && (
                  <img 
                    src={SMALL_IMG_BASE_URL + item.image} 
                    alt="History" 
                    className="size-14 sm:size-16 flex-none rounded-lg object-cover shadow-sm
                             aspect-video"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold truncate mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 font-medium">
                    {formatDate(item.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3">
                <span 
                  className={`inline-block py-1 px-3 rounded-full text-xs sm:text-sm font-medium 
                            ${item.searchType === "movie" ? "bg-red-600/90" : 
                              item.searchType === "tv" ? "bg-blue-600/90" : "bg-green-600/90"}`}
                >
                  {item.searchType.toUpperCase()}
                </span>
                
                <button 
                  onClick={() => handleDelete(item)}
                  className="text-gray-400 hover:text-red-500 transition-colors duration-150"
                  aria-label="Delete item"
                >
                  <Trash className="size-5 sm:size-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default HistoryPage;
