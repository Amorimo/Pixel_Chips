// Foco na busca por OS
const focoOS = document.getElementById('searchOS');

// Iniciar a janela de OS desabilitando botões
document.addEventListener('DOMContentLoaded', () => {
    // Exemplo: document.getElementById('btnUpdateOS').disabled = true;
    focoOS.focus();
});

// Captura dos dados do formulário de OS
const frmOS = document.getElementById('frmOS');
const nameClient = document.getElementById('inputNameClient');
const phoneClient = document.getElementById('inputPhoneClient');
const device = document.getElementById('inputDevice');
const model = document.getElementById('inputModel');
const defect = document.getElementById('inputDefect');
const status = document.getElementById('inputStatus');
const cost = document.getElementById('inputCost');
const worker = document.getElementById('inputWorker');
const notes = document.getElementById('inputNotes');

// Evento de submit do formulário
frmOS.addEventListener('submit', async (event) => {
    event.preventDefault();

    console.log(
        nameClient.value,
        phoneClient.value,
        device.value,
        model.value,
        defect.value,
        status.value,
        cost.value,
        worker.value,
        notes.value
    );

    const ordem = {
        nomeCliente: nameClient.value,
        foneCliente: phoneClient.value,
        console: device.value,
        modelo: model.value,
        defeito: defect.value,
        status: status.value,
        valor: cost.value,
        funcionario: worker.value,
        avaliacaoTec: notes.value
    };
    
      
      


    window.api.newOS(ordem); 
});

// Resetar o formulário
function resetFormOS() {
    frmOS.reset();
    focoOS.focus();
}

// Reseta o formulário quando for solicitado pelo processo principal
window.api.resetFormOS(() => {
    resetFormOS();
});
