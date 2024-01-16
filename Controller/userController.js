const userModel = require('../Model/UserModel')
const createUser = async function (req, res) {
  const user = req.body;
  const userDetails = await userModel.create(user);
  return res.status(400).send({ msg: userDetails })
}
module.exports = {
  createUser: createUser
}







