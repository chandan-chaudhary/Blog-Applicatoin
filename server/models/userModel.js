const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    validate :{
      validator: function(el){
       return el.unique == false
      },
      message: 'username already exist!',
    },
    required: [true, 'username is missing'],
  },
  email: {
    type: String,
    unique: true,
    validate :{
      validator: function(el){
       return el.unique == false
      },
      message: 'email already exist!',
    },
    required: [true, 'email is missing'],
    lowercase: true,
    validate: [validator.isEmail, 'please provide correct email'],
  },
  password: {
    type: String,
    required: [true, 'a user must have password'],
    minlength: [8, 'a password must have atleast 8 character'],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, 'please confirm your password'],
    // select: false,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Password do not match',
    },
  },
  profilePic: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  passwordUpdatedAt: Date,
  passwordResetToken: String,
  passwordResetExpiresIn: Date,
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordUpdatedAt = Date.now() - 1000;
  console.log(this.passwordUpdatedAt);
  next();
});
// Encrypt password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.confirmPassword = undefined;
  next();
});

//reset Token
userSchema.methods.resetPasswordToken = function () {
  // simple token
  const resetToken = crypto.randomBytes(32).toString('hex');
  // encrypt token
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpiresIn = Date.now() + 10 * 60 * 1000; //into milisecond
  console.log('mid', this.passwordResetToken);
  return resetToken;
};

// CHECK IF PASSWORD IS UPDATED after JWT IS SENT
userSchema.methods.isPasswordUpdated = function (JWTTimestamp) {
  if (this.passwordUpdatedAt) {
    // get time into seconds
    const passwordTimestamp = this.passwordUpdatedAt.getTime() / 1000;
    console.log('ispass', passwordTimestamp, JWTTimestamp);
    return JWTTimestamp < passwordTimestamp;
  }
  return false;
};
const User = mongoose.model('User', userSchema);
module.exports = User;
