const Category = require('../models/categoryModel');
const Post = require('../models/postModel');

exports.createCategory = async (req, res) => {
  try {
    const { category } = req.body;
    if (await Category.findOne({ category }))
      throw new Error('Category already exist');
    const categoryUser = await Category.create({ category: req.body });

    res.status(200).json({
      status: 'success',
      data: {
        categoryUser,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getAllCatPost = async (req, res) => {
  try {
    const { category } = req.query;
    const posts = await Post.find({ category });
    if (!posts) throw new Error('Cannot find post');

    res.status(200).json({
      status: 'sucsess',
      posts,
    });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err.message });
  }
};

exports.getAllCategory = async (req, res) => {
  try {
    const category = await Post.find({}, { title: true });
    if (!category)
      throw new Error('No category matched, Please create new category');
    // await Categories.save({ valiatebe });
    // let categories
    // category.forEach(cat=>{
    // categories = await Category.create({ category: category.title });
    // });
    res.status(200).json({
      status: 'success',
      total: category.length,
      data: {
        category,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
