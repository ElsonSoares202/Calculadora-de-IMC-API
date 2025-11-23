const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/imc", (req, res) => {
  const { peso, altura } = req.body;

  if (!peso || !altura || peso <= 0 || altura <= 0) {
    return res.status(400).json({ erro: "Dados inválidos." });
  }
//Formula do IMC
  const imc = peso / (altura * altura);
  let classificacao = "";

  if (imc < 18.5) classificacao = "magreza";
  else if (imc <= 24.9) classificacao = "eutrofia";
  else if (imc <= 29.9) classificacao = "sobrepeso";
  else if (imc <= 34.9) classificacao = "obesidade grau I";
  else if (imc <= 40) classificacao = "obesidade grau II";
  else classificacao = "obesidade grau III";

  res.json({
    imc: imc.toFixed(2),
    classificacao,
  });
});

app.listen(3000, () => {
  console.log("API rodando em http://localhost:3000");
});

app.get("/", (req, res) => {
  res.send("API funcionando! ✔");
});
