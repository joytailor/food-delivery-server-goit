const dbUser = "joy_tailor";
const dbUserPassword = "mC6B8R77shdR83Vl";

module.exports = {
  port: 3001,
  dbUser,
  dbUserPassword,
  dbUrl: `mongodb+srv://${dbUser}:${dbUserPassword}@newcluster-yx8ss.mongodb.net/test?retryWrites=true`
};