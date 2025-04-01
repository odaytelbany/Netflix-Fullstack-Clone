import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";

const useGetContentCredits = (id) => {
    const [allCredits, setAllCredits] = useState([]);
    const {contentType} = useContentStore();

    useEffect(() => {
        const getAllCredits = async () => {
            try {
                const res = await axios.get(`/api/v1/${contentType}/${id}/credits`);
                setAllCredits(res.data.data.credits);
            } catch (err) {
                if (err.message.includes("404")) {
                    setAllCredits([]);
                }
            }
        };
        getAllCredits();
    }, [contentType, id]);

    return {allCredits};
}

export default useGetContentCredits;