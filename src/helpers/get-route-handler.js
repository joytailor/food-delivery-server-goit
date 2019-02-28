const hasNumber = myString => /\d/.test(myString);
const isCategory = string => string.match(/category/);
const isSignUp = string => string.match(/sign-up/);

const getIdFreeUrl = url => {
  const lastIndex = url.lastIndexOf('=');
  const queryString = url.slice(lastIndex +1).trim();
  const indexOfQueryRequest = url.indexOf('?');


  if(isSignUp){
    return url.slice(0, indexOfQueryRequest);
  }

  if (!hasNumber(queryString) && !isCategory(url)) {
    return url;
  }

  if (queryString && lastIndex !== -1) {
    return url.slice(0, lastIndex);
  }
  return url;
};

const getRouteHandler = (routerConfig, url) => {
  const clearUrl = getIdFreeUrl(url);

  return routerConfig[clearUrl];

};

module.exports = getRouteHandler;