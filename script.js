const key = "your key";

function buttonClicked() {
  const cidade = document.querySelector(".input-cidade").value;
  console.log(cidade);
  pesquisarCidade(cidade);
}

async function pesquisarCidade(cidade) {
  try {
    const resposta = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`
    );

    if (!resposta.ok) {
      throw new Error("Cidade não encontrada!");
    }

    const dados = await resposta.json();
    console.log(dados);

    // Atualiza o HTML com os dados
    document.querySelector(".cidade").innerText = `Tempo em ${dados.name}`;
    document.querySelector(".temperatura").innerText = `${Math.round(
      dados.main.temp
    )}°C`;
    document.querySelector(
      ".img-previsao"
    ).src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
    document.querySelector(".texto-previsao").innerText =
      dados.weather[0].description;
    document.querySelector(".umidade").innerText = `Umidade: ${dados.main.humidity}%`;
  } catch (erro) {
    console.error(erro);
    alert("Erro: " + erro.message);
  }
}
