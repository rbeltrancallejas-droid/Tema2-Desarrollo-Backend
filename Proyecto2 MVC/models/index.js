const sequelize = require('../config/database');

const User = require('./user.Model');
const Book = require('./book.Model');
const Category = require('./category.Model');


// Relación 1:N entre Category y Book
Category.hasMany(Book, {
  foreignKey: 'categoryId',
  as: 'books'
});

Book.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category'
});


module.exports = {
  sequelize,
  User,
  Book,
  Category
};