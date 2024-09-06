const saldoInicialInput = document.getElementById('saldo-inicial');
const definirSaldoButton = document.getElementById('definir-saldo');
const saldoAtualSpan = document.getElementById('saldo-atual');
const formularioGastos = document.getElementById('formulario-gastos');
const limparDadosBtn = document.getElementById('limpar-dados-btn'); // Movendo a declaração para o topo

let saldoAtual = 0;
let gastos = carregarGastos();

// Função para carregar gastos do localStorage
function carregarGastos() {
  const gastosSalvos = localStorage.getItem('gastos');
  return gastosSalvos ? JSON.parse(gastosSalvos) : [];
}

// Função para salvar saldo e gastos no localStorage
function salvarDados() {
  localStorage.setItem('saldoAtual', saldoAtual);
  localStorage.setItem('gastos', JSON.stringify(gastos));
}

// Função para atualizar o saldo exibido
function atualizarSaldo() {
  saldoAtualSpan.textContent = saldoAtual;
}

// Define o saldo inicial ao clicar no botão
definirSaldoButton.addEventListener('click', () => {
  saldoAtual = parseFloat(saldoInicialInput.value) || 0;
  atualizarSaldo();
  salvarDados();
});

// Adiciona um novo gasto ao submeter o formulário
formularioGastos.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = document.getElementById('data').value;
  const onde = document.getElementById('onde').value;
  const valorInput = document.getElementById('valor');
  const valor = parseFloat(valorInput.value);
  const descricao = document.getElementById('descricao').value;

  // Calcula e atualiza o saldo
  saldoAtual = (saldoAtual - valor).toFixed(2); 
  atualizarSaldo();

  // Cria um novo objeto de gasto
  const novoGasto = { data, onde, valor, descricao };
  gastos.push(novoGasto);
  salvarDados();

  // Reseta o formulário
  formularioGastos.reset();
});

// Carrega os dados ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  const saldoSalvo = localStorage.getItem('saldoAtual');
  saldoAtual = saldoSalvo ? parseFloat(saldoSalvo) : 0;
  atualizarSaldo();

  gastos = carregarGastos();
});

// Limpa todos os dados ao clicar no botão "Limpar Dados"
limparDadosBtn.addEventListener('click', () => {
  // Limpa o localStorage
  localStorage.clear();

  // Reseta o saldo e a exibição
  saldoAtual = 0;
  atualizarSaldo();

  // Limpa a lista de gastos (se existir)
  const listaGastos = document.getElementById('gastos');
  if (listaGastos) {
    listaGastos.innerHTML = '';
  }

  alert('Dados limpos com sucesso!');
});