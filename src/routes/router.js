const mainRoute = require('./main/main');
const productsRoute = require('./products/products');
const signUpRoute = require('./signUp/signUp');

const router = {
  "/products": productsRoute,
  "/sign-up": signUpRoute,
  default: mainRoute,
};

module.exports = router;