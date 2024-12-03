const express = require("express");
const { User } = require("./models");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });
    res.status(201).json({
      id: user.id,
      email: user.email,
    });
  } catch (err) {
    console.error(err);
    if (err.name === "SequelizeValidationError") {
      return res.status(400).json({ message: "Validation Error" });
    } else if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ message: "User already exists" });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
