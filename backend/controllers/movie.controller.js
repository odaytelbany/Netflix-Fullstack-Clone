import { fetchFromTmdb } from "../services/tmdb.service.js";
export const getTrendingMovie = async (req, res) => {
  try {
    const data = await fetchFromTmdb(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );
    const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];
    res.json({success: true, data: {content: randomMovie}});
  } catch (error) {
    console.log("Error in getTrendingMovie controller: ", error);
    res.status(500).json({success: false, message: "Internal server error!"});
  }
};

export const getTrailers = async (req, res) =>{
    try {
        const {id} = req.params;
        const data = await fetchFromTmdb(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`)
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
        const data = await fetchFromTmdb(`https://api.themoviedb.org/3/movie/${id}`)
        res.json({success: true, data: {details: data}});
    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }
        return res.status(500).json({success: false, message: "Internal server error!"})
    }
}
export const getSimilarMovies = async (req, res) => {
    try {
        const {id} = req.params;
        const data = await fetchFromTmdb(`https://api.themoviedb.org/3/movie/${id}/similar`)
        res.json({success: true, data: {similar: data.results}});
    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }
        return res.status(500).json({success: false, message: "Internal server error!"})
    }
}

export const getmovieCategory = async (req, res) =>{
    try {
        const {category} = req.params;
        const data = await fetchFromTmdb(`https://api.themoviedb.org/3/movie/${category}`)
        res.json({success: true, data: data.results });
    } catch (error) {
        return res.status(500).json({success: false, message: "Internal server error!"})
    }
}



export const getAllGenres = async (req, res) => {
    try {
      const data = await fetchFromTmdb(
        "https://api.themoviedb.org/3/genre/movie/list?language=en"
      );
      res.json({success: true, data: data});
    } catch (error) {
      console.log("Error in getTrendingMovie controller: ", error);
      res.status(500).json({success: false, message: "Internal server error!"});
    }
  };
export const getmovieGenre = async (req, res) =>{
    try {
        const {genre} = req.params;
        const data = await fetchFromTmdb(`https://api.themoviedb.org/3/discover/movie?with_genres=${genre}`)
        res.json({success: true, data: data.results });
    } catch (error) {
        return res.status(500).json({success: false, message: "Internal server error!"})
    }
}