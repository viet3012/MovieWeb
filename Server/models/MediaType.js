const fs = require("fs");

const MediaType = {
  all: function () {
    return JSON.parse(fs.readFileSync("data/MediaType.json", "utf8"));
  },
};

module.exports = MediaType;
