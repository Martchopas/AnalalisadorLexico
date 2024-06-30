var listaPalavras = [];
var listaPalavrasValidadas = [];
var letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

document.addEventListener("DOMContentLoaded", function() {});

function adicionarColunas() {
    var cabecalho = document.getElementById('cabecalhoTabela');
    letras.forEach(function(letra) {
      var th = document.createElement('th');
      th.textContent = letra;
      cabecalho.appendChild(th);
    });
  }
  
  window.onload = function() {
    adicionarColunas();
  };
  
function adicionarPalavra() {
  var palavra = document
    .getElementById("palavraInput")
    .value.trim()
    .toUpperCase();

  if (palavra === "") {
    alert("Insira uma palavra");
    return false;
  }

  if (listaPalavras.includes(palavra)) {
    alert("Palavra já informada");
    return;
  }

  exibePalavra(palavra);

  Tabela(palavra);
}
function exibePalavra(palavra) {
    listaPalavras.push(palavra);
    var divExibePalavras = document.getElementById("exibePalavras");
    var novoElemento = document.createElement("span");

    novoElemento.className = "palavras";
    

    novoElemento.textContent = palavra + ' - ';

    divExibePalavras.appendChild(novoElemento);
}

function validaLP(letra, indice) {
  var charCodeLetra = letra.toUpperCase().charCodeAt(0);
  var coluna = document.getElementById("coluna" + charCodeLetra + "linha" + indice);

  if (coluna == null) {
    return null;
  }

  if (coluna.innerHTML !== "") {
    coluna.style.backgroundColor = "green";
    return true;
  } else {
    coluna.style.backgroundColor = "red";
    return false;
  }
}

function Validar() {
    var inputP = document.getElementById("VInput").value;
    inputP = inputP.trim();
    if (inputP === "") {
      alert("Por favor, insira uma palavra antes de validar");
      return false;
    }

    resetarCoresGrid();
  
    var letras = inputP.split('');
    var isPalavraValida = true;
  
    letras.forEach(function(letra, indice) {
      if (!validaLP(letra, indice)) {
        isPalavraValida = false;
        return;
      }
    });
  
    var ultimoI = inputP.length;
    var linhaF = document.getElementById("linha" + ultimoI + "coluna0");
    
    if (linhaF && linhaF.innerHTML.includes("*") && isPalavraValida) {
      alert("Palavra está na linguagem");
      
    } else {
      alert("Palavra não está na linguagem");
    }
    document.getElementById('validaPalavraInput').value = "";
    listaPalavrasValidadas.push(inputP);
  }

  function Tabela(palavra) {
    var Tabela = document.getElementById("Tabela");
    var linhas = Tabela.getElementsByTagName("tr");
    for (var i = 0; i < linhas.length; i++) {
      if (linhas[i].cells[0].innerText === palavra) {
        alert("Esta palavra já foi adicionada.");
        return;
      }
    }
  
    var letras = palavra.split("");
    var nLinhas = "";
    for (var j = 0; j < letras.length; j++) {
      var ultimaLetra = letras.length - 1 === j;
      var linhaExistente = document.getElementById("linha" + j);
      var nLinha = criaNovaLinhaOuAtualiza(j, false, letras);
      if (!linhaExistente) {
        nLinhas += nLinha;
      }
  
      if (ultimaLetra) {
        var posicaoFinal = j + 1;
        var linhaFinalJaExistente = document.getElementById("linha" + posicaoFinal);
        var linhaFinal = criaNovaLinhaOuAtualiza(posicaoFinal, true, letras);
        if (!linhaFinalJaExistente) {
          nLinhas += linhaFinal;
        }
      }
    }
    Tabela.innerHTML += nLinhas;
  
    document.getElementById("palavraInput").value = "";
  }
  
  function criaNovaLinhaOuAtualiza(j, ultimaLetra, letras) {
    var nLinha = "<tr id='linha" + j + "'><td id='linha" + j + "coluna0' class='colunaLateral'>q" + j + (ultimaLetra ? "*" : "") + "</td>";
    var primeiraColExistente = document.getElementById("linha" + j + "coluna0");
    if (ultimaLetra && primeiraColExistente && !primeiraColExistente.innerHTML.includes("*")) {
      primeiraColExistente.innerHTML += "*";
    }
    for (var i = 65; i <= 90; i++) {
      var letra = String.fromCharCode(i);
      var pLetra = letras[j] === letra;
      var proximaSentenca = j + 1;
      var colunaJaExistente = document.getElementById("coluna" + i + "linha" + j);
      nLinha += "<td id='coluna" + i + "linha" + j + "' class='coluna'>" + (!colunaJaExistente && pLetra && !ultimaLetra ? "q" + proximaSentenca : "") + "</td>";
      if (colunaJaExistente && pLetra && colunaJaExistente.innerHTML === "") {
        colunaJaExistente.innerHTML += "q" + proximaSentenca;
      }
    }
    nLinha += "</tr>";
    return nLinha;
  }
  
  function resetarCoresGrid() {
    var celulas = document.querySelectorAll("#Tabela td.coluna");
    celulas.forEach(function(celula) {
      celula.style.backgroundColor = "";
    });
  }

