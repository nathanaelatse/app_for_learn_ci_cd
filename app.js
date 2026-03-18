const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route XSS volontaire
app.get("/hello", (req, res) => {
  const name = req.query.name;
  res.send("<h1>Bonjour " + name + "</h1>");
});

// Route open redirect volontaire
app.get("/redirect", (req, res) => {
  const url = req.query.url;
  res.redirect(url);
});

// Route eval volontaire
app.post("/calc", (req, res) => {
  const expression = req.body.expression;
  const result = eval(expression);
  res.send("Résultat: " + result);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});