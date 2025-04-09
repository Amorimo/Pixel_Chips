// Foco na busca por Estoque
const focoEstoque = document.getElementById('searchEstoque');

// Iniciar a janela de Estoque desabilitando botões
document.addEventListener('DOMContentLoaded', () => {
    focoEstoque.focus();
});

// Captura dos dados do formulário de Estoque
const frmEstoque = document.getElementById('frmEstoque');
const nomeEstoque = document.getElementById('inputNomeEstoque');
const codigoEstoque = document.getElementById('inputCodigoEstoque');
const quantidadeEstoque = document.getElementById('inputQuantidadeEstoque');
const precoEstoque = document.getElementById('inputPrecoEstoque');
const categoriaEstoque = document.getElementById('inputCategoriaEstoque');

// Evento de submit do formulário
frmEstoque.addEventListener('submit', async (event) => {
    event.preventDefault();

    const itemEstoque = {
        nome: nomeEstoque.value,
        codigo: codigoEstoque.value,
        quantidade: quantidadeEstoque.value,
        preco: precoEstoque.value,
        categoria: categoriaEstoque.value
    };

    window.api.newEstoque(itemEstoque);
});

// Resetar o formulário
function resetFormEstoque() {
    frmEstoque.reset();
    focoEstoque.focus();
}

// Reseta o formulário quando for solicitado pelo processo principal
window.api.resetFormEstoque(() => {
    resetFormEstoque();
});
