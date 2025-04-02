import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";

const useGetImages = (id) => {
    const [allImages, setAllImages] = useState([]);
    const {contentType} = useContentStore();

    useEffect(() => {
        const getAllImages = async () => {
            try {
                const res = await axios.get(`/api/v1/${contentType}/${id}/images`);
                setAllImages(res.data.data.images);
            } catch (err) {
                if (err.message.includes("404")) {
                    setAllImages([]);
                }
            }
        };
        getAllImages();
    }, [contentType, id]);

    return {allImages};
}

export default useGetImages;