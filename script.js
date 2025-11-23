document.getElementById("imcForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const peso = parseFloat(document.getElementById("peso").value);
  const altura = parseFloat(document.getElementById("altura").value);

  try {
    const resposta = await fetch("http://localhost:3000/api/imc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ peso, altura }),
    });

    const data = await resposta.json();
    console.log("Retorno da API:", data);

    if (!resposta.ok) {
      document.getElementById("resultado").innerHTML =
        `<span style="color:red;">${data.erro}</span>`;
      return;
    }

    document.getElementById("resultado").innerHTML =
      `<strong>IMC:</strong> ${data.imc}<br>
       <strong>Classificação:</strong> ${data.classificacao}`;

  } catch (error) {
    console.error("Erro:", error);
    document.getElementById("resultado").innerHTML =
      `<span style="color:red;">Erro ao conectar com a API.</span>`;
  }
});
