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
});  /*LA VERSION VULN DETECTABLE AVEC SAST*/

/*const express = require("express");
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
  const url = req.query.url;

  const allowedPaths = ["/", "/hello"];

  if (!allowedPaths.includes(url)) {
    return res.status(400).send("URL de redirection non autorisée");
  }

  res.redirect(url);
});

app.post("/calc", (req, res) => {
  return res.status(400).json({
    error: "Fonction désactivée : évaluation dynamique interdite"
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
}); */