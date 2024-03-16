const express = require('express');
const userController = require('./../controller/userController');

const Router = express.Router();
const authController = require('./../controller/authController');

Router.route('/register').post(authController.signUp);
Router.route('/loginUser').get(authController.loginUser);
Router.route('/forgotpassword').post(authController.forgotPassword);
Router.route('/resetpassword/:token').patch(authController.resetPassword);
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
