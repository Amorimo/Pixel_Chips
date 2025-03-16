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
