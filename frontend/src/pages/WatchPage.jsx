import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContentStore } from "../store/content";
import Navbar from "../components/Navbar";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import  ReactPlayer from "react-player";

const WatchPage = () => {
    const { id } = useParams();
    const [trailers, setTrailers] = useState([]);
    const [similarContent, setSimilarContent] = useState([]);
    const [currentTrailerIndex, setCurrentTrailerIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState({});
    const { contentType } = useContentStore();

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
            try {
                const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
                setContent(res.data.data.details);
            } catch (err) {
                if (err.message.includes("404")) {
                    setContent(null);
                }
            } finally {
                setLoading(false);
            }
        };

        getContentDetails();
    }, [contentType, id]);

    const handlePrev = () => {
        if (currentTrailerIndex > 0) setCurrentTrailerIndex(currentTrailerIndex - 1);
    }
    const handleNext = () => {
        if (currentTrailerIndex < trailers.length - 1) setCurrentTrailerIndex(currentTrailerIndex + 1);
    }

    console.log(content);
    return (
        <div className="bg-black min-h-screen text-white">
            <div className="mx-auto container px-4 py-8 h-full">
                <Navbar />
                {trailers.length > 0 && (
                    <div className="flex justify-between items-center mb-4">
                        <button
                            className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded 
                            ${currentTrailerIndex === 0
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                                }`}
                            disabled={currentTrailerIndex === 0}
                            onClick={handlePrev}
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded 
                            ${currentTrailerIndex === trailers.length - 1
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                                }`}
                            disabled={currentTrailerIndex === trailers.length - 1}
                            onClick={handleNext}
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                )}

                <div className="aspect-video mb-8 py-2 sm:px-10 md:px-32">
                    {
                        trailers.length > 0 && (
                            <ReactPlayer 
                                controls={true}
                                width={"100%"}
                                height={"70vh"}
                                className="mx-auto overflow-hidden rounded-lg"
                                url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIndex].key}`}
                            />
                        )
                    }
                    {
                        trailers.length === 0 && (
                            <h2 className="text-xl text-center mt-5">
                                No Trailers Avilable for {" "}
                                <span className="font-bold text-red-600">
                                    {content?.title || content?.name}
                                </span>
                            </h2>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default WatchPage;
