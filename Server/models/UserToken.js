const fs = require("fs");

const Users = {
  all: function () {
    return JSON.parse(fs.readFileSync("data/userToken.json", "utf8"));
  },
};

module.exports = Users;
