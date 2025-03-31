import { useEffect, useState } from "react"
import { useContentStore } from "../store/content";
import axios from "axios";

const useGetGenres = () => {
  const [allGenres, setAllGenres] = useState();
  const {contentType} = useContentStore();

  useEffect(() => {
    const getAllGenres = async () => {
        const res = await axios.get(`/api/v1/${contentType}/genres`);
        setAllGenres(res.data.data.genres);
    };
    getAllGenres();
  }, [contentType]);

  return {allGenres};
}

export default useGetGenres;