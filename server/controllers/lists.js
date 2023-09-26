import Composer from "../models/Composer.js";
import Label from "../models/Label.js";
import Media from "../models/Media.js";
import Category from "../models/Category.js";

export const getComposers = async (req, res) => {
  try {
    const composers = await Composer.find().sort({
      name: 1,
    });

    res.status(200).json(composers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getLabels = async (req, res) => {
  try {
    const labels = await Label.find().sort({
      name: 1,
    });

    res.status(200).json(labels);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getMedia = async (req, res) => {
  try {
    const media = await Media.find();

    res.status(200).json(media);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({
      name: 1,
    });

    res.status(200).json(categories);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
