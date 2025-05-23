import { User } from "../models/user.js";
import { fetchFromTmdb } from "../services/tmdb.service.js";

export const searchMulti = async (req, res) => {
  try {
    const { query } = req.params;

    const response = await fetchFromTmdb(
      `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (response.results.length === 0) {
      return res.status(404).send(null);
    }

    const existingItem = await User.findOne({
      _id: req.user._id,
      searchHistory: { $elemMatch: { id: response.results[0].id } },
    });

    if (!existingItem) {
      await User.findByIdAndUpdate(req.user._id, {
        $addToSet: {
          searchHistory: {
            $each: [
              {
                id: response.results[0].id,
                image: response.results[0].profile_path || response.results[0].poster_path || "",
                title: response.results[0].name || response.results[0].title,
                searchType: response.results[0].media_type,
                createdAt: new Date(),
              },
            ],
          },
        },
      });
    }
    res.status(200).json({ success: true, data: response.results });
  } catch (error) {
    console.log("Error in searchMulti controller: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server error !" });
  }
};

export const searchPerson = async (req, res) => {
  try {
    const { query } = req.params;

    const response = await fetchFromTmdb(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (response.results.length === 0) {
      return res.status(404).send(null);
    }

    const existingPerson = await User.findOne({
      _id: req.user._id,
      searchHistory: { $elemMatch: { id: response.results[0].id } },
    });

    if (!existingPerson) {
      await User.findByIdAndUpdate(req.user._id, {
        $push: {
          searchHistory: {
            id: response.results[0].id,
            image: response.results[0].profile_path,
            title: response.results[0].name,
            searchType: "person",
            createdAt: new Date(),
          },
        },
      });
    }
    res.status(200).json({ success: true, data: response.results });
  } catch (error) {
    console.log("Error in searchPerson controller: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server error !" });
  }
};

export const searchMovie = async (req, res) => {
  try {
    const { query } = req.params;

    const response = await fetchFromTmdb(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (response.results.length === 0) {
      return res.status(404).send(null);
    }

    const existingMovie = await User.findOne({
      _id: req.user._id,
      searchHistory: { $elemMatch: { id: response.results[0].id } },
    });
    if (!existingMovie){
      await User.findByIdAndUpdate(req.user._id, {
        $push: {
          searchHistory: {
            id: response.results[0].id,
            image: response.results[0].poster_path,
            title: response.results[0].title,
            searchType: "movie",
            createdAt: new Date(),
          },
        },
      });
    }
    res.status(200).json({ success: true, data: response.results });
  } catch (error) {
    console.log("Error in searchMovie controller: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server error !" });
  }
};

export const searchTv = async (req, res) => {
  try {
    const { query } = req.params;

    const response = await fetchFromTmdb(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (response.results.length === 0) {
      return res.status(404).send(null);
    }

    const existingTv = await User.findOne({
      _id: req.user._id,
      searchHistory: { $elemMatch: { id: response.results[0].id } },
    });

    if (!existingTv){
      await User.findByIdAndUpdate(req.user._id, {
        $push: {
          searchHistory: {
            id: response.results[0].id,
            image: response.results[0].poster_path,
            title: response.results[0].name,
            searchType: "tv",
            createdAt: new Date(),
          },
        },
      });
    }
    res.status(200).json({ success: true, data: response.results });
  } catch (error) {
    console.log("Error in searchTv controller: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server error !" });
  }
};

export const getSearchHistory = async (req, res) => {
  try {
    res.status(200).json({ success: true, data: req.user.searchHistory });
  } catch (error) {
    console.log("Error in getSearchHistory controller: ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const clearHistory = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $set: {
        searchHistory: []
      },
    });
    res
      .status(200)
      .json({ success: true, message: "Search History Cleared Successfully" });
  } catch (error) {
    console.log("Error in clearHistory controller: ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const deleteItemFromSearchHistory = async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: { id: id },
      },
    });
    res
      .status(200)
      .json({ success: true, message: "Item removed from search history" });
  } catch (error) {
    console.log("Error in deleteItemFromSearchHistory controller: ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
