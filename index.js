const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const port = 5000;

app.use(express.json());

const users = [
  {
    id: "1",
    username: "gauravstr2680",
    password: "1234",
    isAdmin: true,
  },
  {
    id: "2",
    username: "user2",
    password: "user2",
    isAdmin: false,
  },
];

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => {
    return u.username === username && u.password === password;
  });
  if (user) {
    // Generate an access token
    const accessToken = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      "mySecretKey"
    );
    res.json({
      username: user.username,
      isAdmin: user.isAdmin,
      accessToken,
    });
  } else {
    res.status(400).send("Username or password incorrect🙄");
  }
});

const varify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.varify(token, "mySecretKey", (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You are not authenticated!");
  }
};

app.get("/", (req, res) => {
  res.send("Hello from node server🎇");
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}🔥`);
});
