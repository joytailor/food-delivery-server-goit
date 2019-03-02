const express = require('express');
const mainRoute = require('./main/main');
const getProductsRoute = require('./products/products');
const getProductsItemById = require('./products/productItemById');
const getProductsItemsByIdsRoute = require('./products/productsItemsByIds');
const getProductsItemsByCategoryRoute = require('./products/productsItemsByCategory');
const signUpRoute = require('./users/signUp');
const getUserById = require('./users/getUserById');
const sendOrderRoute = require('./users/sendOrderRoute');
const postImageRoute = require('./images/postImageRoute');

const apiRoutes = express.Router();

const userMiddleware = (req, res, next) => {
  if(req.body.userName){
    next();
    return
  }
  res.status(400);
  res.json({
    error: `User hasn't "userName" fiddle`
  })
};

apiRoutes
  .get('/', mainRoute)
  .get('/products', getProductsRoute)
  .get('/products/:id', getProductsItemById)
  .get('/products/?ids', getProductsItemsByIdsRoute)
  .get('/products/?category', getProductsItemsByCategoryRoute)
  .get('/users/:id', getUserById)

  .post('/sign-up', userMiddleware, signUpRoute)
  .post('/orders', sendOrderRoute)
  .post('/images', postImageRoute)

module.exports = apiRoutes;