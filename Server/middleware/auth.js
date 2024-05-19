const Users = require("../models/UserToken");

module.exports = (req, res, next) => {
  const requestToken = req.query.token;
  // kiểm tra xem có token không
  if (!requestToken) {
    res.status(401).json({ message: "Unauthorized" });
  }

  const users = Users.all();
  // tìm người dùng từ request token
  const checkUser = users.find((user) => user.token === requestToken);
  if (!checkUser) {
    res.status(401).json({ message: "Unauthorized" });
  }
  next();
};
