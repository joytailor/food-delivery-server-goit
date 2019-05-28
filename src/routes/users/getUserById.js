const User = require('./../../modules/db/shemas/userShema');

const getUserByIdRoute = (request, response) => {

  const id = request.params.id;
  
  const sendResponse = (user) => {
    response.status(200);
    response.json(user);
  };

  const findUser = User.findById(id);

  findUser
    .then(sendResponse)
    .catch(error => {
      console.error(error);
    });

}

module.exports = getUserByIdRoute;