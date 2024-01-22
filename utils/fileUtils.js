const fs = require("fs");
const path = require("path");

const readUsersFromJson = () => {
  const usersJson = fs.readFileSync(
    path.join(__dirname, "../customers.json"),
    "utf8"
  );
  return JSON.parse(usersJson);
};

module.exports = { readUsersFromJson };
