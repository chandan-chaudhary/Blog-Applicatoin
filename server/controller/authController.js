const bcrypt = require('bcryptjs');
const sendMail = require('./../email');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const multer = require('multer');
// const sharp = require('sharp');

const User = require('./../models/userModel');
const { promisify } = require('util');

// CREATE JWT
const createToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET_TOKEN, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const cookieOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIES_EXPIRE_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOption.secure = true;

  res.cookie('jwt', token, cookieOption);
  return token;
};

//register user
exports.signUp = async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });

    const token = createToken(user._id, res);
    user.password = undefined;
    res.status(201).json({
      status: 'success',
      token,
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error('Credentials is missing');

    // find user and include its password along with
    const user = await User.findOne({ email }).select('+password');
    // if (user) {
    // user.select('+password');
    const validatePass = await bcrypt.compare(password, user.password);
    console.log(validatePass);
    // }
    if (!user || !validatePass) throw new Error('Credentials not valid');

    const token = createToken(user._id, res);
    user.password = undefined;
    console.log('cookie =>', req.headers);
    res.status(200).json({
      status: 'success',
      token,
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new Error('no user found');
  const resetToken = user.resetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const tokenURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetpassword/${resetToken}`;
  const message = `Please reset your password ${tokenURL}, valid for 10 min.\n Please ignore if already done`;
  console.log(
    'for',
    resetToken,
    user.passwordResetToken,
    user.passwordResetExpiresIn
  );
  try {
    await sendMail({
      email: user.email,
      subject: 'password reset token ',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'mail sent on gmail',
    });
  } catch (err) {
    //  we need to set these field to undefined bcoz mail was not sent successfully. yet these field were updated
    user.passwordResetToken = undefined;
    user.passwordResetExpiresIn = undefined;
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// RESET PASSWORD
exports.resetPassword = async (req, res) => {
  try {
    // get user
    const recivedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');
    const user = await User.findOne({
      passwordResetToken: recivedToken,
      passwordResetExpiresIn: { $gt: Date.now() },
    });
    console.log('>', req.params.token, recivedToken);
    if (!user) throw new Error('no user match');
    //  modify user data
    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpiresIn = undefined;
    // user.passwordUpdatedAt = Date.now();
    await user.save({ validateBeforeSave: true });
    console.log('resetpass', user.passwordUpdatedAt);
    res.status(200).json({
      status: 'success',
      message: 'password has been changed',
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// UPDATE ACCOUNT DETAIL
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('File type didnot match', false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
exports.uploadImage = upload.single('profilePic');

// Resize image as per convinence
exports.resizeImage = async (req, res, next) => {
  //  check for file in req buffer.. if no file continue to next midleware
  if (!req.file) next();
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  // resize compress and define format for file..this function does mutate original file so no need to store in any variable
  // await sharp(req.file.buffer)
  //   .toFormat('jpeg')
  //   .jpeg({ quality: 90 })
  //   .toFile(`/public/img/users/${req.file.filename}`);

  next();
};

// this function carry all the fields need to be updated including file and user data
const filterObj = (obj, ...fieldstobeUpdated) => {
  const needUpdate = {};
  Object.keys(obj).forEach((el) => {
    if (fieldstobeUpdated.includes(el)) needUpdate[el] = obj[el];
  });
  return needUpdate;
};

// Update your account
exports.updateAccount = async (req, res, next) => {
  try {
    console.log('updateacc> ', req.user);
    // check if user is logged in
    if (!req.user) throw new Error('Please Login!');
    console.log('updateacc', req.user.id);
    //  if trying to change password
    if (req.body.password || req.body.confirmPassword)
      throw new Error('You cannot update your password here!');

    // filter our user data need to be updated
    const updateUserData = filterObj(req.body, 'username', 'email');
    // check for any file need to be updated
    if (req.file) updateUserData.profilePic = req.file.filename;
    // find user and update respective data
    const user = await User.findByIdAndUpdate(req.user.id, updateUserData, {
      new: true,
      runValidators: true,
    });
     if (!user) throw new Error('No user found!');
    user.updatedAt = Date.now()

    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// UPDATE PASSWORD
exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('+password');
    if (!req.body.currentPassword)
      throw new Error('Enter your existing password!');
    if (!(await bcrypt.compare(req.body.currentPassword, user.password)))
      throw new Error(`Password didn't match`);
    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    user.save({ validateBeforeSave: true });
    // create token
    const token = createToken(user.id, res);
    res.status(200).json({
      status: 'success',
      token,
      message: 'Password updated successfully!',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// PROTECT ROUTES
exports.protectRoutes = async (req, res, next) => {
  try {
    // GET TOKEN
    let token;
    console.log('protect',req.headers);
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
       token = req.headers.authorization.split(' ')[1];
    }else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) throw new Error('please login again');
    console.log('protecttoken',token);

    // VERIFY TOKEN
    const verificationID = await promisify(jwt.verify)(
        token,
      process.env.JWT_SECRET_TOKEN
    );
    console.log('verification',verificationID);
    const loggedUser = await User.findById(verificationID.id);
    if (!loggedUser) throw new Error('No user found');
    // loggedUser.passwordupdated;
    if (loggedUser.isPasswordUpdated(verificationID.iat))
      throw new Error('Authentication failed, Please login again!');

    // GIVE ACCESS to LOGGED user
    req.user = loggedUser;
    // next();
  } catch (err) {
    return res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
  next();
};
