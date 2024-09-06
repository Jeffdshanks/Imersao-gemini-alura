const listaGastos = document.getElementById('gastos');

// Carrega e exibe os gastos ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  const gastos = carregarGastos();
  exibirGastos(gastos);
});

// Função para carregar os gastos do localStorage
function carregarGastos() {
  const gastosSalvos = localStorage.getItem('gastos');
  return gastosSalvos ? JSON.parse(gastosSalvos) : [];
}

// Função para exibir os gastos na lista
function exibirGastos(gastos) {
  listaGastos.innerHTML = ''; // Limpa a lista antes de exibir

  gastos.forEach(gasto => {
    // Cria um novo item de lista para cada gasto
    const novoGasto = document.createElement('li');
    // Formata o texto do item de lista
    novoGasto.textContent = `${gasto.data} - ${gasto.onde} - R$ ${gasto.valor.toFixed(2)} - ${gasto.descricao}`;
    // Adiciona o item de lista à lista de gastos
    listaGastos.appendChild(novoGasto);
  });
}