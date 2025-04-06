import { fetchFromTmdb } from "../services/tmdb.service.js";
export const getTrendingTv = async (req, res) => {
  try {
    const data = await fetchFromTmdb(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
    );
    const randomTv = data.results[Math.floor(Math.random() * data.results?.length)];
    res.json({success: true, data: {content: randomTv}});
  } catch (error) {
    console.log("Error in getTrendingTv controller: ", error);
    res.status(500).json({success: false, message: "Internal server error!"});
  }
};

export const getTrailers = async (req, res) =>{
    try {
        const {id} = req.params;
        const data = await fetchFromTmdb(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`)
        res.json({success: true, data: {trailers: data.results}});
    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }
        return res.status(500).json({success: false, message: "Internal server error!"})
    }
}

export const getDetails = async (req, res) =>{
    try {
        const {id} = req.params;
        const data = await fetchFromTmdb(`https://api.themoviedb.org/3/tv/${id}`)
        res.json({success: true, data: {details: data}});
    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }
        return res.status(500).json({success: false, message: "Internal server error!"})
    }
}
export const getImages = async (req, res) =>{
    try {
        const {id} = req.params;
        const data = await fetchFromTmdb(`https://api.themoviedb.org/3/tv/${id}/images`)
        res.json({success: true, data: {images: data.backdrops}});
    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }
        return res.status(500).json({success: false, message: "Internal server error!"})
    }
}
export const getCredits = async (req, res) =>{
    try {
        const {id} = req.params;
        const data = await fetchFromTmdb(`https://api.themoviedb.org/3/tv/${id}/credits`)
        res.json({success: true, data: {credits: data.cast}});
    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }
        return res.status(500).json({success: false, message: "Internal server error!"})
    }
}
export const getSimilarTvs = async (req, res) =>{
    try {
        const {id} = req.params;
        const data = await fetchFromTmdb(`https://api.themoviedb.org/3/tv/${id}/similar`)
        res.json({success: true, data: {similar: data.results}});
    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }
        return res.status(500).json({success: false, message: "Internal server error!"})
    }
}

export const getTvCategory = async (req, res) =>{
    try {
        const {category} = req.params;
        const data = await fetchFromTmdb(`https://api.themoviedb.org/3/tv/${category}`)
        res.json({success: true, data: data.results });
    } catch (error) {
        return res.status(500).json({success: false, message: "Internal server error!"})
    }
}

export const getAllGenres = async (req, res) => {
    try {
      const data = await fetchFromTmdb(
        "https://api.themoviedb.org/3/genre/tv/list?language=en"
      );
      res.json({success: true, data: data});
    } catch (error) {
      console.log("Error in getTrendingMovie controller: ", error);
      res.status(500).json({success: false, message: "Internal server error!"});
    }
  };
export const gettvGenre = async (req, res) =>{
    try {
        const {genre} = req.params;
        const data = await fetchFromTmdb(`https://api.themoviedb.org/3/discover/tv?with_genres=${genre}`)
        res.json({success: true, data: data.results });
    } catch (error) {
        return res.status(500).json({success: false, message: "Internal server error!"})
    }
}

export const getSeasonEpisodes = async (req, res) =>{
    try {
        const {id, season} = req.params;
        const data = await fetchFromTmdb(`https://api.themoviedb.org/3/tv/${id}/season/${season}?language=en-US`)
        res.json({success: true, data: data.episodes });
    } catch (error) {
        return res.status(500).json({success: false, message: "Internal server error!"})
    }
}