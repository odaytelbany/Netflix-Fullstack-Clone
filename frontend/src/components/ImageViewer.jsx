import React, { useState } from "react";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { motion, AnimatePresence } from "framer-motion";

const ImageViewer = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    }
  };
  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="group mt-12 max-w-5xl mx-auto relative aspect-video rounded-lg overflow-hidden">
      <div className="bg-gray-700 opacity-0 group-hover:opacity-100 transition-all duration-300 absolute px-2 py-1 rounded-full top-5 z-10 left-1/2 -translate-x-1/2">
        {currentIndex + 1} of {images.length}
      </div>
      
      <button
        onClick={handlePrev}
        className={`absolute top-1/2 -translate-y-1/2 left-5 transition-all duration-300 opacity-0 bg-gray-700 hover:bg-gray-800 text-white py-4 px-4 rounded-full z-10
          ${currentIndex === 0 ? "group-hover:opacity-50 cursor-not-allowed" : "group-hover:opacity-80 cursor-pointer"}`}
        disabled={currentIndex === 0}
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={handleNext}
        className={`absolute top-1/2 -translate-y-1/2 right-5 transition-all duration-300 opacity-0 bg-gray-700 hover:bg-gray-800 text-white py-4 px-4 rounded-full z-10
          ${currentIndex === images.length - 1 ? "group-hover:opacity-50 cursor-not-allowed" : "group-hover:opacity-80 cursor-pointer"}`}
        disabled={currentIndex === images.length - 1}
      >
        <ChevronRight size={24} />
      </button>
      <Zoom>
        <div className="w-full h-full bg-gray-900">
          <AnimatePresence mode='wait' initial={false}>
            <motion.img
              key={currentIndex}
              src={ORIGINAL_IMG_BASE_URL + images[currentIndex].file_path}
              alt="image"
              initial={{ x: direction * 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -direction * 100, opacity: 0 }}
              transition={{ type: "tween", duration: 0.3 }}
              className="w-full h-full object-contain"
            />
          </AnimatePresence>
        </div>
      </Zoom>

    </div>
  );
};

export default ImageViewer;