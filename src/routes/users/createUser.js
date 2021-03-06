const User = require('../../modules/db/shemas/userShema');
const bcrypt = require('bcrypt');

const createUser = (request, response) => {
  const user = request.body;

  const hashedPassword = bcrypt.hashSync(user.password, 10);

  const userData = { ...user, password: hashedPassword };

  const newUser = new User(userData);

  const sendResponse = (user) => {
    console.log(user);

    response.json({
      status: 'success',
      user,
    });
  };

  const sendError = (err) => {
    response.status(400);
    response.json({
      error: 'user has not been saved',
      errorType: err.stack
    });
  };

  newUser.save()
  .then(sendResponse)
  .catch(sendError)

};

module.exports = createUser;