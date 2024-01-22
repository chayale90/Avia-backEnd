const fs = require("fs");
const express = require("express");
const path = require("path");
const router = express.Router();
const { readUsersFromJson } = require("../utils/fileUtils");

router.get("/", (req, res) => {
  res.json({ msg: "users work" });
});

router.get("/users-list", async (req, res) => {
  try {
    const currentUsers = readUsersFromJson();
    return res.status(200).json(currentUsers);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "err", err });
  }
});

router.post("/add-user", async (req, res) => {
  try {
    const userData = req.body;
    const currentUsers = readUsersFromJson();
    currentUsers.push(userData);
    const jsonData = JSON.stringify(currentUsers);
    fs.writeFile(
      path.resolve(__dirname, "../customers.json"),
      jsonData,
      (error) => {
        if (error) {
          console.error("Error writing to file:", error);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.status(201).json({ message: "User added successfully!" });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/user-info/:userEmail", async (req, res) => {
  try {
    const { userEmail } = req.params;
    const currentUsers = readUsersFromJson();
    let userInfo = currentUsers.find((user) => user.email === userEmail);
    if (!userInfo) return res.status(404).json({ message: "User not found" });
    return res.status(200).json(userInfo);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
