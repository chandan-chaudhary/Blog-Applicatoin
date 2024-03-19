const express = require('express');
const userController = require('./../controller/userController');

const Router = express.Router();
const authController = require('./../controller/authController');

Router.route('/register').post(authController.signUp);
Router.route('/login').post(authController.loginUser);
Router.route('/forgot-password').post(authController.forgotPassword);
Router.route('/reset-password/:token').patch(authController.resetPassword);
Router.route('/update-personal-account').patch(
  authController.protectRoutes,
  authController.updateAccount
);
Router.route('/update-password').patch(
  authController.protectRoutes,
  authController.updatePassword
);

Router.route('/').get(userController.getAllUser);
// .post(userController.createUser);

Router.route('/:id')
  .get(userController.getUserbyId)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = Router;
