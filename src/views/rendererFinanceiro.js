const { ipcRenderer } = require('electron');

// Captura o formulário
const frmFinanceiro = document.getElementById('frmFinanceiro');

// Quando o formulário for enviado
frmFinanceiro.addEventListener('submit', (e) => {
    e.preventDefault();

    const tipo = document.getElementById('tipoTransacao').value;
    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const data = document.getElementById('data').value;

    // Envia para o main
    ipcRenderer.send('salvar-financeiro', {
        tipo,
        descricao,
        valor,
        data
    });
});

// Escuta a resposta do main
ipcRenderer.on('salvar-financeiro-resposta', (event, resposta) => {
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
