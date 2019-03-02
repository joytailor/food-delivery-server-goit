const allUsers = require("../../db/users/all-users.json");
const url = require("url");

const findUser = (arr, id) => {
  return arr.find(el => String(el.id) === id);
}

debugger

const getQueryId = url => {
  const indexOf = url.pathname.lastIndexOf("/");

  if(indexOf !== -1){
    const idString = url.pathname.slice(indexOf + 1).trim();

    return idString;
  }

  return url;
}

const getUserByIdRoute = (request, response) => {
  const parseUrl = url.parse(request.url);
  const id = getQueryId(parseUrl);
  const user = findUser(allUsers, id);

  if(user) {

    const responseBody = {
      status: "success",
      user: user
    };

    response.write(JSON.stringify(responseBody));
    response.end();
  } else {

    const responseBody = {
      status: "no not found"
    };

    response.write(JSON.stringify(responseBody));
    response.end();
  }
}

module.exports = getUserByIdRoute;