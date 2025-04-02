import React, { useState } from "react";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const ImageViewer = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };
  const handleNext = () => {
    if (currentIndex < images.length - 1) setCurrentIndex(currentIndex + 1);
  };

  return (
    <div
      className="group mt-12 max-w-5xl mx-auto relative flex items-center justify-center rounded overflow-hidden"
    >
        <div className="bg-gray-700 opacity-0 group-hover:opacity-100 transition-all duration-300 absolute px-2 py-1 rounded-full top-5">{currentIndex + 1} of {images.length}</div>
      <button
        onClick={handlePrev}
        className={`absolute left-5 transition-all duration-300 opacity-0 bg-gray-700 hover:bg-gray-800  text-white py-4 px-4 rounded 
                            ${
                              currentIndex === 0
                                ? "group-hover:opacity-50 cursor-not-allowed"
                                : "group-hover:opacity-80 cursor-pointer"
                            }`}
        disabled={currentIndex === 0}
      >
        <ChevronLeft size={24} />
      </button>
      <Zoom>
        <img
          src={ORIGINAL_IMG_BASE_URL + images[currentIndex].file_path}
          alt="image"
        />
      </Zoom>
      <button
        onClick={handleNext}
        className={`absolute right-5 transition-all duration-300 opacity-0 bg-gray-700 hover:bg-gray-800  text-white py-4 px-4 rounded 
            ${
              currentIndex === images.length - 1
                ? "group-hover:opacity-50 cursor-not-allowed"
                : "group-hover:opacity-80 cursor-pointer"
            }`}
        disabled={currentIndex === images.length - 1}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default ImageViewer;
