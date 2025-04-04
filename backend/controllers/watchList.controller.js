import { User } from "../models/user.js";

export const getWatchList = async (req, res) => {
  try {
    const watchList = req?.user?.watchList || [];
    res.status(200).json({ success: true, data: watchList });
  } catch (error) {
    console.log("Error in getWatchList controller: ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const addToWatchList = async (req, res) => {
  const item = req.body;
  try {
    const existingItem = await User.findOne({
      _id: req.user._id,
      watchList: { $elemMatch: { id: item?.id } },
    });

    if (existingItem) {
      return res
        .status(400)
        .json({ success: false, message: "Already in watchlist" });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        watchList: item,
      },
    });

    res.status(200).json({ success: true, message: "Added to watchlist" });
  } catch (error) {
    console.log("Error in addToWatchList controller: ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const removeFromWatchList = async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        watchList: { id: id },
      },
    });
    res.status(200).json({ success: true, message: "Removed from watchlist" });
  } catch (error) {
    console.log("Error in removeFromWatchList controller: ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const isInWatchList = async (req, res) => {
  const { id } = req.params;
  try {
    const watchList = req?.user?.watchList || [];
    const isInWatchList = watchList.some((item) => item.id === parseInt(id));
    res.status(200).json({ success: true, data: isInWatchList });
  } catch (error) {
    console.log("Error in isInWatchList controller: ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}