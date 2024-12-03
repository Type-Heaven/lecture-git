const express = require("express");
const { User } = require("./models");
const { generateToken, verifyToken } = require("./helpers/jwt");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Email or password is wrong" });
    }

    const access_token = generateToken({ id: user.id, email: user.email });
    res.status(200).json({ access_token });
  } catch (err) {}
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
