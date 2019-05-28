const User = require('./../../modules/db/shemas/userShema');

const getAllUsersRoute = (request, response) => {
  const sendResponse = (users) => {
    response.status(200);
    response.json(users);
  }
  User.find()
    .then(sendResponse)
    .catch(error => {
      console.error(error);
    });
};

module.exports = getAllUsersRoute;