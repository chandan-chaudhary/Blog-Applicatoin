const Post = require('../models/postModel');

const Category = require('../models/categoryModel');
const User = require('../models/userModel');

exports.allPosts = async (req, res) => {
  const username = req.query.user;
  const title = req.query.category;
  let posts;
  try {
    if (username) {
      let user = await User.findOne({
        username,
      });
      if (!user) throw new Error('The user donot exist');
      posts = await Post.find({
        user: user._id,
      });
    } else if (title) {
      // let titleCat = await Category.find({ title });
      // console.log(titleCat);
      // if (!titleCat)
      //   throw new Error(`No post related to this ${titleCat} category`);
      posts = await Post.find({ title });
    } else {
      posts = await Post.find();
    }
    if (!posts) throw new Error('No post');

    res.status(200).json({
      status: 'success',
      total: posts.length,
      data: {
        posts,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.createPost = async (req, res) => {
  try {
    // if (!req.body.user) req.body.user = req.user._id;
    const post = await Post.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

module.exports.getSinglePost = async (req, res) => {
  try {
    // if (!req.body.user) req.body.user = req.user.id;
    const post = await Post.findById(req.params.id);
    if (!post) throw new Error('No post result found!');
    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
module.exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) throw new Error('no post found with that id');

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
