const User = require('./../../modules/db/shemas/userShema');

const getUser = (request, response) => {
  const id = request.params.id;

  const sendResponse = (user) => {
    response.status(200);
    response.json({
      status: 'User is successfully deleted',
      userInfo: user
    });
  };

  User
    .findById(id)
    .remove()
    .then(sendResponse)
    .catch(error => {
      console.error(error);
    });
};

module.exports = getUser;
