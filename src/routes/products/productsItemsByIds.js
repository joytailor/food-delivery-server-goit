const allProducts = require("../../db/products/all-products.json");
const url = require("url");

const filterProducts = (arr, ids) => {
  return arr.filter(el => ids.includes(String(el.id)));
}

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
  const filteredProducts = filterProducts(ids, allProducts);

  if(filteredProducts.length > 1) {
    const newArray = filteredProducts.reduce((acc, el) => {
    const {id, sku, name, description} = el;
    return (acc = [...acc, {id, sku, name, description}]);
    }, []);

    const responseBody = {
      status: "success",
      products: newArray
    };

    res.write(JSON.stringify(responseBody));
    res.end();
  } else {

    const responseBody = {
      status: "no products",
      products: []
    };

    res.write(JSON.stringify(responseBody));
    res.end();
  }
}

module.exports = productsItemsByIdsRoute;