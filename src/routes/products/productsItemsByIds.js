const allProducts = require("../../db/products/all-products.json");
const url = require("url");

const filterProducts = (arr, ids) => {
  return arr.filter(el => ids.includes(String(el.id)));
}

debugger

const getQueryId = url => {
  const indexOf = url.query.indexOf("=");

  if(indexOf !== -1){
    const idString = url.query.slice(indexOf + 1).trim();
    const arrOfIds = idString.split(",");

    return arrOfIds;
  }

  return url;
}

const productsItemsByIdsRoute = (request, response) => {
  const parseUrl = url.parse(request.url);
  const ids = getQueryId(parseUrl);
  const filteredProducts = filterProducts(allProducts, ids);

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