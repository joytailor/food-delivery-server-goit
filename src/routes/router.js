const express = require('express');
const main = require('./main/main');
const getProducts = require('./products/products');
const getProductsItemById = require('./products/productItemById');
const getProductsItemsByIds = require('./products/productsItemsByIds');
const getProductsItemsByCategory = require('./products/productsItemsByCategory');

const createUser = require('./users/createUser');
const getAllUsers = require('./users/getAllUsers');
const getUserById = require('./users/getUserById');
const updateUser = require('./users/updateUser');
const deleteUser = require('./users/deleteUser');
const sendOrder = require('./users/sendOrderRoute');

const postImage = require('./images/postImageRoute');

const apiRoutes = express.Router();

const userMiddleware = (req, res, next) => {
  if(req.body.userName){
    console.log(`I'm working`);
    next();
    return
  }
  res.status(400);
  res.json({
    error: `User hasn't "userName" fiddle`
  })
};

apiRoutes
  .get('/', main)
  .get('/products', getProducts)
  .get('/products/:id', getProductsItemById)
  .get('/products/?ids', getProductsItemsByIds)
  .get('/products/?category', getProductsItemsByCategory)

  .get('/users/:id', getUserById)
  .get('/users', getAllUsers)
  .post('/users/:id', updateUser)
  .post('/create-user', userMiddleware, createUser)
  .delete('/delete-user', deleteUser)
  .post('/orders', sendOrder)

  .post('/images', postImage)

module.exports = apiRoutes;