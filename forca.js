// Estima a entropia de uma senha em bits.

function tamanhoDoAlfabeto(senha) {
  let alfabeto = 0;
  if (/[a-z]/.test(senha)) alfabeto += 26;
  if (/[A-Z]/.test(senha)) alfabeto += 26;
  if (/[0-9]/.test(senha)) alfabeto += 10;
  if (/[^a-zA-Z0-9]/.test(senha)) alfabeto += 33;
  return alfabeto;
}

function calcularBits(senha) {
  const alfabeto = tamanhoDoAlfabeto(senha);
  if (alfabeto === 0) return 0;
  return senha.length * Math.log2(alfabeto);
}

function mostrarForca() {
  const senha = document.getElementById("forca-senha").value;
  const bits = calcularBits(senha);
  const saida = document.getElementById("forca-resultado");
  saida.className = "resultado " + (bits >= 60 ? "bom" : "ruim");
  saida.textContent = bits.toFixed(1).replace(".", ",") + " bits";
}

document.getElementById("forca-senha").addEventListener("input", mostrarForca);
