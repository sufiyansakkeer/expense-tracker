import Category from "../models/category.model.js";

export const createCategory = async (req, res, next) => {
  try {
    const { categoryName, categoryType, type } = req.body;

    const category = await Category.create({
      categoryName,
      categoryType,
      type,
      user: req.user.id,
    });

  return  res.status(201).json({
      message: "Category created",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req, res,next) => {
  try {
    const categories = await Category.find({ user: req.user.id, isDeleted: false });
  return  res.status(200).json({
      message: "Categories fetched",
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};


export const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findOne({_id: req.params.id,user: req.user.id });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    category.isDeleted = true; // Set isDeleted to true to soft delete
    await category.save();

  return  res.status(200).json({
      message: "Category deleted",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const restoreCategory = async (req, res, next) => {
  try {
    const category = await Category.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.isDeleted = false;
    await category.save();

    return res.status(200).json({
      message: "Category restored",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};


