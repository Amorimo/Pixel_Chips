const frmFinanceiro = document.getElementById('frmFinanceiro');

frmFinanceiro.addEventListener('submit', (e) => {
    e.preventDefault();

    const tipo = document.getElementById('tipoTransacao').value;
    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const data = document.getElementById('data').value;

    // Usa a API do preload.js
    window.api.newFinanceiro({
        tipo,
        descricao,
        valor,
        data
    });
});

// Escuta a resposta do main
window.api.resetFormFinanceiro((_, resposta) => {
    if (resposta.sucesso) {
        alert('Movimentação financeira salva com sucesso!');
        frmFinanceiro.reset();
        atualizarTabelaFinanceiro();
    } else {
        alert('Erro ao salvar movimentação: ' + resposta.erro);
    }
});

// Função para resetar o formulário
function resetFormFinanceiro() {
    frmFinanceiro.reset();
}

// Função para atualizar a tabela 
async function atualizarTabelaFinanceiro() {

}
