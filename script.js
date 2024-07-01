var ListaP = [];
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
  
function addPalavra() {
  var palavra = document.getElementById("palavraInput").value.trim().toUpperCase();
  if (palavra === "") {
    alert("Insira uma palavra");
    return false;
  }
  if (ListaP.includes(palavra)) {
    alert("Palavra já informada");
    return;
  }
  exibePalavra(palavra);
  Tabela(palavra);
}

function exibePalavra(palavra) {
    ListaP.push(palavra);
    var divPalavrasLinguagem = document.getElementById("palavrasLinguagem");
    var newE = document.createElement("span");
    newE.className = "palavras";
    newE.textContent = palavra + ' - ';
    divPalavrasLinguagem.appendChild(newE);
}

function validaLP(letra, indice) {
  var letraP = letra.toUpperCase().charCodeAt(0);
  var coluna = document.getElementById("coluna" + letraP + "Line" + indice);
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
  var inputP = document.getElementById("VInput").value.trim();
  if (inputP === "") {
    alert("Por favor, insira uma palavra antes de validar.");
    return false;
  }

  resetarCoresGrid();
  var letras = inputP.split('');
  var pValida = true;

  letras.forEach(function(letra, indice) {
    if (!validaLP(letra, indice)) {
      pValida = false;
      return;
    }
  });

  var ultimoI = inputP.length;
  var linhaF = document.getElementById("Line" + ultimoI + "coluna0");
  if (linhaF && linhaF.innerHTML.includes("*") && pValida) {
    alert("Palavra está na linguagem.");
  } else {
    alert("Palavra não está na linguagem.");
  }

  document.getElementById('validaPalavraInput').value = "";
  ListaPValidadas.push(inputP);
}

function resetarCoresGrid() {
  var celulas = document.querySelectorAll("#Tabela td.coluna");
  celulas.forEach(function(celula) {
    celula.style.backgroundColor = "";
  });
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
      var uLetra = letras.length - 1 === j;
      var LinhaE = document.getElementById("Line" + j);
      var nLinha = AtualizaTabela(j, false, letras);
      if (!LinhaE) {
        nLinhas += nLinha;
      }
      if (uLetra) {
        var pFinal = j + 1;
        var LFJE = document.getElementById("Line" + pFinal);
        var LinhaF = AtualizaTabela(pFinal, true, letras);
        if (!LFJE) {
          nLinhas += LinhaF;
        }
      }
    }
    Tabela.innerHTML += nLinhas;
    document.getElementById("palavraInput").value = "";
  }
  
  function AtualizaTabela(j, uLetra, letras) {
    var nLinha = `<tr id='Line${j}'><td id='Line${j}coluna0'>q${j}${uLetra ? '*' : ''}</td>`;
    var PCE = document.getElementById(`Line${j}coluna0`);
    if (uLetra && PCE && !PCE.innerHTML.includes('*')) {
      PCE.innerHTML += '*';
    }
    for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
      const letra = String.fromCharCode(i);
      const pLetra = letras[j] === letra;
      const pSentence = j + 1;
      const CJE = document.getElementById(`coluna${i}Line${j}`);
      nLinha += `<td id='coluna${i}Line${j}' class='coluna'>${!CJE && pLetra && !uLetra ? 'q' + pSentence : ''}</td>`;
      if (CJE && pLetra && CJE.innerHTML === '') {
          CJE.innerHTML += `q${pSentence}`;
      }
  }
  
    nLinha += '</tr>';
    return nLinha;
  }
  
  


