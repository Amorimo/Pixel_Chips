function buscarCEP() {
    let cep = document.getElementById("inputCEPClient").value.replace(/\D/g, ""); // Remove caracteres não numéricos
    console.log("CEP digitado:", cep);

    if (cep.length !== 8) {
        console.warn("CEP inválido! Digite um CEP com 8 números.");
        alert("CEP inválido! Digite um CEP com 8 números.");
        return;
    }

    let urlAPI = `https://viacep.com.br/ws/${cep}/json/`;
    console.log("Buscando dados na URL:", urlAPI);

    fetch(urlAPI)
        .then(response => {
            console.log("Resposta recebida:", response);
            return response.json();
        })
        .then(dados => {
            console.log("Dados recebidos:", dados);

            if (dados.erro) {
                console.error("CEP não encontrado!");
                alert("CEP não encontrado!");
                return;
            }

            // Preenchendo os campos
            document.getElementById("inputAddressClient").value = dados.logradouro || "";
            document.getElementById("inputNeighborhoodClient").value = dados.bairro || "";
            document.getElementById("inputCityClient").value = dados.localidade || "";
            document.getElementById("inputUFClient").value = dados.uf || "";

            console.log("Campos preenchidos com sucesso!");
        })
        .catch(error => console.error("Erro ao buscar CEP:", error));
}



// ============================================================

// vetor global que será usado na manipulação dos dados
let arrayClient = []

// capturar o foco na busca pelo nome do cliente
// a constante foco obtem o elemento html (input) identificado como 'searchClient'
const foco = document.getElementById('searchClient')


function teclaEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault()
        buscarCliente()
    }
}
// Iniciar a janela de clientes alterando as propriedades de alguns elementos
document.addEventListener('DOMContentLoaded',()=>{
    // Desabilitar botões
    btnUpdate.disable=true
    btnUpdate.disable=true

    // Foco na busca do cliente
    foco.focus()
})

// Captura dos dados dos input do funcionario (Passo 1: fluxo)
let frmClient=document.getElementById('frmClient')
let nameClient=document.getElementById('inputNameClient')
let cpfClient=document.getElementById('inputCPFClient')
let emailClient=document.getElementById('inputEmailClient')
let phoneClient=document.getElementById('inputPhoneClient')
let cepClient=document.getElementById('inputCEPClient')
let addressClient=document.getElementById('inputAddressClient')
let numberClient=document.getElementById('inputNumberClient')
let complementClient=document.getElementById('inputComplementClient')
let neighborhoodClient=document.getElementById('inputNeighborhoodClient')
let cityClient=document.getElementById('inputCityClient')
let ufClient=document.getElementById('inputUFClient')

// captura do id do cliente (usado no delete e update)
let id = document.getElementById('idClient')


// == Manipulação da tecla Enter ============================

// Função para manipular o evento da tecla Enter
function teclaEnter(event) {
    // se a tecla Enter for pressionada
    if (event.key === "Enter") {
        event.preventDefault() // ignorar o comportamento padrão
        // associar o Enter a busca pelo cliente
        buscarCliente()
    }
}

// Função para restaurar o padrão da tecla Enter (submit)
function restaurarEnter() {
    frmClient.removeEventListener('keydown', teclaEnter)
}

// "Escuta do evento Tecla Enter"
frmClient.addEventListener('keydown', teclaEnter)

// == Fim - manipulação tecla Enter ==========================

// Evento associado ao botão submit (Uso das validações do HTML)
frmClient.addEventListener('submit', async (event)=>{
    // Evitar o comportamento padrão do submit que é enviar os dados do formulário e reiniciar o documento HTML
    event.preventDefault()

    // Teste importante (Recebimento dos dados do formulário - Passo 1 do fluxo)
    console.log(nameClient.value, cpfClient.value, emailClient.value, phoneClient.value, cepClient.value, addressClient.value, numberClient.value, numberClient.value, complementClient.value, neighborhoodClient.value, cityClient.value, ufClient.value)


    // Criar um objeto para armazenar os dados do cliente antes de enviar ao main
    const client={
        nameCli: nameClient.value,
        cpfCli: cpfClient.value,
        emailCli: emailClient.value,
        phoneCli: phoneClient.value,
        cepCli: cepClient.value,
        addressCli: addressClient.value,
        numberCli: numberClient.value,
        complementCli: complementClient.value,
        neighborhoodCli: neighborhoodClient.value,
        cityCli: cityClient.value,
        ufCli: ufClient.value
    }

    
    api.newClient(client)
})

// ============================================================


//============================================================
// == CRUD Read ===============================================

function buscarCliente() {
    //console.log("teste do botão buscar")
    // Passo 1: capturar o nome do cliente
    let name = document.getElementById('searchClient').value
    console.log(name) // teste do passo 1

    // validação de campo obrigatório
    // se o campo de busca não foi preenchido
    if (name === "") {
        // enviar ao main um pedido para alertar o usuário
        api.validateSearch()
        foco.focus()

    } else {
        api.searchName(name) // Passo 2: envio do nome ao main
        // recebimento dos dados do cliente
        api.renderClient((event, dataClient) => {
            console.log(dataClient) // teste do passo 5
            // passo 6 renderizar os dados do cliente no formulário
            // - Criar um vetor global para manipulação dos dados
            // - criar uma constante para converter os dados recebidos (string) para o formato JASON (JSON.parse)
            // usar o laço forEach para percorre o vetor e setar os campos (caixas de texto) do formulário
            const dadosCliente = JSON.parse(dataClient)
            // atribuir ao vetor os dados do cliente
            arrayClient = dadosCliente
            // extrair os dados do cliente
            arrayClient.forEach((c) => {
                id.value = c._id,
                    nameClient.value = c.nomeCliente,
                    cpfClient.value = c.cpfCliente,
                    emailClient.value = c.emailCliente,
                    phoneClient.value = c.foneCliente,
                    cepClient.value = c.cepCliente,
                    addressClient.value = c.logradouroCliente,
                    numberClient.value = c.numeroCliente,
                    complementClient.value = c.complementoCliente,
                    neighborhoodClient.value = c.bairroCliente,
                    cityClient.value = c.cidadeCliente,
                    ufClient.value = c.ufCliente
                // desativar o botão adicionar
                btnCreate.disabled = true
                // ativar os botões editar e excluir
                btnUpdate.disabled = false
                btnDelete.disabled = false
            })
        })
    }
}

// setar o cliente não cadastrado (recortar do campo de busca e colar no campo nome)
api.setClient((args) => {
    // criar uma variável para armazenar o valor digitado no campo de busca (nome ou cpf)
    let campoBusca = document.getElementById('searchClient').value
    // foco no campo de nome do cliente
    nameClient.focus()
    // remover o valor digitado no campo de busca
    foco.value = ""
    // preencher o campo de nome do cliente com o nome da busca
    nameClient.value = campoBusca

})

// == Fim - CRUD Read =========================================
// ============================================================


// == Reset form ==============================================
function resetForm() {
    // Limpar os campos e resetar o formulário com as configurações pré definidas
    location.reload()
}

// Recebimento do pedido do main para resetar o form
api.resetForm((args) => {
    resetForm()
})

// == Fim - reset form ========================================
// ============================================================

// Mascara do CPF

function aplicarMascaraCPF() {
    const input = document.getElementById('inputCPFClient');
    input.addEventListener('input', () => {
        let value = input.value.replace(/\D/g, ''); // Remove tudo que não é número

        if (value.length > 11) {
            value = value.slice(0, 11); // Limita a 11 dígitos
        }

        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

        input.value = value;
    });
}

// Chame a função ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    aplicarMascaraCPF();
});


function validarCPF() {
   
}