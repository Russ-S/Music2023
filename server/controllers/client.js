import Recording from "../models/Recording.js";
import Performance from "../models/Performance.js";

export const getRecordings = async (req, res) => {
  try {
    const recordings = await Recording.find().sort({
      composer: 1,
      composition: 1,
    });

    res.status(200).json(recordings);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPerformances = async (req, res) => {
  try {
    const performances = await Performance.find().sort({
      composer: 1,
      composition: 1,
    });

    res.status(200).json(performances);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
