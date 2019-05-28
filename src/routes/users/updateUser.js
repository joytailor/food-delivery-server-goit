const User = require('../../modules/db/shemas/userShema');

const updateUser = (request, response) => {
  const propertyToUpdate = request.body;
  const id = request.params.id;


  const sendError = () => {
    response.status(400);
    response.json({
      status: 'error',
      info: `there's no such user`
    });
  };

  const sendResponse = (newUser) => {
    if(!newUser) {
      return sendError();
    }

    response.status(200);
    response.json({
      status: 'succes',
      user: newUser
    });
  };

  User
    .findOneAndUpdate(
      { _id: id },
      { $addToSet: propertyToUpdate },
      { new: true }
    )
    .then(sendResponse)
    .catch(sendError)

};

module.exports = updateUser;