const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

function criarSenha(tamanho) {
  const bytes = new Uint8Array(tamanho);
  crypto.getRandomValues(bytes);

  return Array.from(bytes, (valor) =>
    caracteres[valor % caracteres.length]
  ).join("");
}

function gerarSenha() {
  const campo = document.getElementById("minha-gerador-tamanho");
  const resultado = document.getElementById("minha-gerador-resultado");
  const tamanho = Number(campo.value);

  if (!Number.isInteger(tamanho) || tamanho < 8 || tamanho > 32) {
    resultado.className = "resultado ruim";
    resultado.textContent = "Escolha um tamanho entre 8 e 32.";
    return;
  }

  resultado.className = "resultado bom";
  resultado.textContent = criarSenha(tamanho);
}

document
  .getElementById("minha-gerador-botao")
  .addEventListener("click", gerarSenha);