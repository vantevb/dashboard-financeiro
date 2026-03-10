const formTransacao = document.getElementById("form-transacao");
const descricaoInput = document.getElementById("descricao");
const valorInput = document.getElementById("valor");
const tipoInput = document.getElementById("tipo");

const totalReceitasElemento = document.getElementById("total-receitas");
const totalDespesasElemento = document.getElementById("total-despesas");
const saldoTotalElemento = document.getElementById("saldo-total");
const listaTransacoesElemento = document.getElementById("lista-transacoes");

let transacoes = JSON.parse(localStorage.getItem("transacoes")) || [
  { id: 1, descricao: "Salário", tipo: "receita", valor: 3500 },
  { id: 2, descricao: "Aluguel", tipo: "despesa", valor: 1200 },
  { id: 3, descricao: "Freelance", tipo: "receita", valor: 900 }
];

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function salvarTransacoes() {
  localStorage.setItem("transacoes", JSON.stringify(transacoes));
}

function calcularTotais() {
  let receitas = 0;
  let despesas = 0;

  for (let i = 0; i < transacoes.length; i++) {
    if (transacoes[i].tipo === "receita") {
      receitas += transacoes[i].valor;
    } else {
      despesas += transacoes[i].valor;
    }
  }

  const saldo = receitas - despesas;

  totalReceitasElemento.textContent = formatarMoeda(receitas);
  totalDespesasElemento.textContent = formatarMoeda(despesas);
  saldoTotalElemento.textContent = formatarMoeda(saldo);
}

function renderizarTransacoes() {
  listaTransacoesElemento.innerHTML = "";

  for (let i = 0; i < transacoes.length; i++) {
    const transacao = transacoes[i];

    const linha = document.createElement("tr");

    const colunaDescricao = document.createElement("td");
    colunaDescricao.textContent = transacao.descricao;

    const colunaTipo = document.createElement("td");
    colunaTipo.textContent = transacao.tipo;

    const colunaValor = document.createElement("td");
    colunaValor.textContent = formatarMoeda(transacao.valor);

    if (transacao.tipo === "receita") {
      colunaTipo.classList.add("tipo-receita");
      colunaValor.classList.add("valor-receita");
    } else {
      colunaTipo.classList.add("tipo-despesa");
      colunaValor.classList.add("valor-despesa");
    }

    const colunaAcao = document.createElement("td");
    const botaoRemover = document.createElement("button");

    botaoRemover.textContent = "Remover";
    botaoRemover.classList.add("btn-remover");
    botaoRemover.addEventListener("click", function () {
      removerTransacao(transacao.id);
    });

    colunaAcao.appendChild(botaoRemover);

    linha.appendChild(colunaDescricao);
    linha.appendChild(colunaTipo);
    linha.appendChild(colunaValor);
    linha.appendChild(colunaAcao);

    listaTransacoesElemento.appendChild(linha);
  }
}

function adicionarTransacao(event) {
  event.preventDefault();

  const descricao = descricaoInput.value.trim();
  const valor = Number(valorInput.value);
  const tipo = tipoInput.value;

  if (descricao === "" || valor <= 0 || tipo === "") {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  const novaTransacao = {
    id: Date.now(),
    descricao: descricao,
    tipo: tipo,
    valor: valor
  };

  transacoes.push(novaTransacao);

  salvarTransacoes();
  renderizarTransacoes();
  calcularTotais();
  formTransacao.reset();
}

function removerTransacao(id) {
  transacoes = transacoes.filter(function (transacao) {
    return transacao.id !== id;
  });

  salvarTransacoes();
  renderizarTransacoes();
  calcularTotais();
}

formTransacao.addEventListener("submit", adicionarTransacao);

renderizarTransacoes();
calcularTotais();