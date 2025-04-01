import { fetchFromTmdb } from "../services/tmdb.service.js";

export const getPersonDetails = async (req, res) => {
    const {id} = req.params;
    try {
        const data = await fetchFromTmdb(`https://api.themoviedb.org/3/person/${id}`);
        res.json({success: true, data: data});
    } catch (error) {
        console.log("Error in getPersonDetails controller: ", error);
        res.status(500).json({success: false, message: "Internal server error!"});
    }
}

export const getPersonCredits = async (req, res) => {
    const {id} = req.params;
    try {
        const data = await fetchFromTmdb(`https://api.themoviedb.org/3/person/${id}/combined_credits`);
        res.json({success: true, data: data});
    } catch (error) {
        console.log("Error in getPersonCredits controller: ", error);
        res.status(500).json({success: false, message: "Internal server error!"});
    }
}

