const allProducts = require("../../db/products/all-products.json");
const url = require("url");

const filterProducts = (arr, category) => {
  return arr.filter(el => el.categories.includes(String(category)));
}

debugger

const getQueryCategory = url => {
  const indexOf = url.query.indexOf("=");

  if(indexOf !== -1){
    const categoryString = url.query.slice(indexOf + 1).trim();

    return categoryString;
  }

  return url;
}

const productsItemsByIdsRoute = (request, response) => {
  const parseUrl = url.parse(request.url);
  const category = getQueryCategory(parseUrl);
  const filteredProducts = filterProducts(allProducts, category);

  if(filteredProducts.length >= 1) {
    const newArray = filteredProducts.reduce((acc, el) => {
    const {id, sku, name, description} = el;
    return (acc = [...acc, {id, sku, name, description}]);
    }, []);

    const responseBody = {
      status: "success",
      products: newArray
    };

    response.write(JSON.stringify(responseBody));
    response.end();
  } else {

    const responseBody = {
      status: "no products",
      products: []
    };

    response.write(JSON.stringify(responseBody));
    response.end();
  }
}

module.exports = productsItemsByIdsRoute;