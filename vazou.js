// Verifica se uma senha aparece em vazamentos, sem enviar a senha.
// API: Pwned Passwords (https://haveibeenpwned.com/API/v3#PwnedPasswords)

async function sha1Hex(texto) {
  const bytes = new TextEncoder().encode(texto);
  const resumo = await crypto.subtle.digest("SHA-1", bytes);
  return [...new Uint8Array(resumo)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
}

async function verificarVazamento() {
  const senha = document.getElementById("vazou-senha").value;
  const resultado = document.getElementById("vazou-resultado");
  const detalhe = document.getElementById("vazou-detalhe");
  if (!senha) return;

  const hash = await sha1Hex(senha);
  const prefixo = hash.slice(0, 5);
  const sufixo = hash.slice(5);
  detalhe.innerHTML = "Enviado à API: <code>" + prefixo + "</code>. O resto do hash ficou aqui.";

  try {
    const resposta = await fetch("https://api.pwnedpasswords.com/range/" + prefixo);
    const linhas = (await resposta.text()).split("\n");
    const achada = linhas.find((linha) => linha.startsWith(sufixo));
    if (achada) {
      const vezes = Number(achada.split(":")[1]);
      resultado.className = "resultado ruim";
      resultado.textContent = "Vazou " + vezes.toLocaleString("pt-BR") + " vezes. Não use.";
    } else {
      resultado.className = "resultado bom";
      resultado.textContent = "Não aparece na base. Isso não prova que é forte.";
    }
  } catch (erro) {
    resultado.className = "resultado ruim";
    resultado.textContent = "Sem resposta da API. Confira a internet.";
  }
}

document.getElementById("vazou-botao").addEventListener("click", verificarVazamento);
