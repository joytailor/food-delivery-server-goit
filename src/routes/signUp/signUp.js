const fs = require("fs");
const path = require("path");

const saveUser = user => {
  const userName = user.username;
  const filePath = path.join(
    __dirname,
    "../../",
    "db/users",
    `${userName}.json`
  ); 
  fs.writeFile(filePath, JSON.stringify(user), function(error){
    if (error) throw error;
    console.log('File saved successfully');
  })
}

const signUpRoute = (request, response) => {
  if(request.method === "POST"){
    let body = "";

    request.on("data", function(data){
      body += data;
    });

    request.on("end", function() {
      let user = JSON.parse(body);
      saveUser(user);

      const data = {status: "success", user: user};
      response.writeHead(200, {"Content-Type": "application/json"});
      response.write(JSON.stringify(data));
      response.end()
    });
  }

}
debugger
module.exports = signUpRoute;