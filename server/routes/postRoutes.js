const express = require('express');
const postController = require('../controller/postController');
const authController = require('../controller/authController');
const Router = express.Router();

Router.route('/')
  .get(postController.allPosts)
  .post( postController.createPost);
  // authController.protectRoutes,
// Router.use(authController.protectRoutes);

Router.route('/:id')
  .get(postController.getSinglePost)
  .patch(authController.protectRoutes,postController.updatePost)
  .delete(authController.protectRoutes,postController.deletePost);
module.exports = Router;
