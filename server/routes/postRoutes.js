const express = require('express');
const postController = require('../controller/postController');
const authController = require('../controller/authController');
const Router = express.Router();

Router.route('/')
  .get(postController.allPosts)
  .post(authController.protectRoutes, postController.createPost);
// Router.use(authController.protectRoutes);

Router.route('/:id')
  .get(postController.getSinglePost)
  .patch(postController.updatePost)
  .delete(postController.deletePost);
module.exports = Router;
