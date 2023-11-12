const express = require("express");
const cors = require("cors");
require("dotenv").config();

const userDB = require("./db");

const app = express();

const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    if (userDB) {
      res.status(200).json({ message: "Ok", userDB });
    } else {
      res.status(400).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/:id", (req, res) => {
  const id = req.params.id;

  try {
    const indexToDelete = userDB.findIndex((user) => user.id === parseInt(id));

    if (indexToDelete !== -1) {
      userDB.splice(indexToDelete, 1);
      res.status(200).json({ message: "User deleted successfully", userDB });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, (err) => {
  if (err) {
    console.error("Error starting server:", err);
  } else {
    console.log(`Server listening on PORT ${PORT}`);
  }
});
