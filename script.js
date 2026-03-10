const transacoes = [
  { descricao: "Salário", tipo: "receita", valor: 3500 },
  { descricao: "Aluguel", tipo: "despesa", valor: 1200 },
  { descricao: "Freelance", tipo: "receita", valor: 800 },
  { descricao: "Internet", tipo: "despesa", valor: 120 }
];

const totalReceitasElemento = document.getElementById("total-receitas");
const totalDespesasElemento = document.getElementById("total-despesas");
const saldoTotalElemento = document.getElementById("saldo-total");
const listaTransacoesElemento = document.getElementById("lista-transacoes");
const formTransacao = document.getElementById("form-transacao");
const descricaoInput = document.getElementById("descricao");
const valorInput = document.getElementById("valor");
const tipoInput = document.getElementById("tipo");

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
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
      colunaTipo.classList.add("receita-texto");
      colunaValor.classList.add("receita-texto");
    } else {
      colunaTipo.classList.add("despesa-texto");
      colunaValor.classList.add("despesa-texto");
    }

    linha.appendChild(colunaDescricao);
    linha.appendChild(colunaTipo);
    linha.appendChild(colunaValor);

    listaTransacoesElemento.appendChild(linha);
  }
}

function adicionarTransacao(evento) {
  evento.preventDefault();

  const descricao = descricaoInput.value.trim();
  const valor = Number(valorInput.value);
  const tipo = tipoInput.value;

  if (descricao === "" || valor <= 0 || tipo === "") {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  const novaTransacao = {
    descricao: descricao,
    tipo: tipo,
    valor: valor
  };

  transacoes.push(novaTransacao);

  renderizarTransacoes();
  calcularTotais();

  formTransacao.reset();
}

formTransacao.addEventListener("submit", adicionarTransacao);

renderizarTransacoes();
calcularTotais();