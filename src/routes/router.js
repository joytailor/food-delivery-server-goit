const mainRoute = require('./main/main');
const productsRoute = require('./products/products');
const productsItemsByIdsRoute = require('./products/productsItemsByIds');
const signUpRoute = require('./signUp/signUp');

const router = {
  "/products": productsRoute,
  "/products/?ids": productsItemsByIdsRoute,
  "/sign-up": signUpRoute,
  default: mainRoute,
};

module.exports = router;