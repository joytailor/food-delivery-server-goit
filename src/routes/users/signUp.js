const fs = require("fs");
const path = require("path");
const qs = require("querystring");
const util = require("util");
const uuidv4 = require("uuid/v4");

const allUsers = path.resolve(__dirname, '../../', 'db/users', 'all-users.json');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const saveUser = usersData => {

  return readFileAsync(allUsers, "utf8")
   .then(data => {
    arrayOfUsers = JSON.parse(data);
    const newArrayOfUsers = [ ...arrayOfUsers, usersData]
    responseJSON = JSON.stringify(newArrayOfUsers);
    writeFileAsync(allUsers, responseJSON, "utf8");
   })
    .catch(err => {
      console.log(err);
    })
}

const signUpRoute = (request, response) => {
  const newUserData = request.body;
  const newUser = { id: uuidv4(), ...newUserData }

  const sendResponse = () => {
    response.set("ContentType", "application/json")
    response.json({
      status: "success",
      user: newUser,
    })
  }

  const sendError = () => {
    response.status(400);
    response.json({
      error: "user has not been saved"
    });
  }

  saveUser(newUser)
   .then(sendResponse)
   .catch(sendError)
}

module.exports = signUpRoute;
