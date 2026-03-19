const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello sécurisé !");
});

app.get("/hello", (req, res) => {
  const name = String(req.query.name || "");
  res.type("text/plain").send(`Bonjour ${name}`);
});

app.get("/redirect", (req, res) => {
  const url = String(req.query.url || "");

  const redirectMap = {
    home: "/",
    hello: "/hello"
  };

  const safeTarget = redirectMap[url];

  if (!safeTarget) {
    return res.status(400).send("URL de redirection non autorisée");
  }

  return res.redirect(safeTarget);
});

app.post("/calc", (req, res) => {
  return res.status(400).json({
    error: "Fonction désactivée : évaluation dynamique interdite"
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});