import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";

const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] = useState();
  const [isTrendingLoading, setIsTrendingLoading] = useState(true);
  const { contentType } = useContentStore();

  useEffect(() => {
    const getTrendingContent = async () => {
      setIsTrendingLoading(true);
      try {
        const res = await axios.get(`/api/v1/${contentType}/trending`);
        setTrendingContent(res.data.data.content);
      } catch (error) {
        console.log("Error fetching trending content:", error);
        setTrendingContent([]);
      }
      finally {
        setIsTrendingLoading(false);
      }
    };
    getTrendingContent();
  }, [contentType]);

  return { trendingContent, isTrendingLoading };
};

export default useGetTrendingContent;
