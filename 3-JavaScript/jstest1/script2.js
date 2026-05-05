const botao = document.getElementById("botao");
const titulo = document.getElementById("titulo");

let clicado = false;

botao.addEventListener("click", () => {
  if (clicado) {
    titulo.textContent = "Olá!";
    clicado = false;
  } else {
    titulo.textContent = "Você clicou!";
    clicado = true;
  }
});