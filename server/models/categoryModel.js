const Mongoose = require('mongoose');

const categorySchema = new Mongoose.Schema({
  category: {
    type: Mongoose.Schema.ObjectId,
    ref: 'Post',
  },
});

categorySchema.pre(/^find/, function (next) {
  this.populate({
    path: 'category',
    select: 'title',
  });
  next();
});

const Category = Mongoose.model('Category', categorySchema);

module.exports = Category;
