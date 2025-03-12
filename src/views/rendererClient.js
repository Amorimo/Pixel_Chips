// Buscar cep
function buscarCEP(){
    // console.log("teste")
    // Armazenar CEP na variável
    let cep=document.getElementById('inputCEPClient').value
    console.log(cep)

    let urlAPI=`https://viacep.com.br/ws/${cep}/json/`
    // Acessando o web service para obter os dados
    fetch(urlAPI)
    .then(response=>response.json())
    .then(dados=>{
        // Extração dos dados
        document.getElementById('inputAddressClient').value=dados.logradouro
        document.getElementById('inputNeighborhoodClient').value=dados.bairro
        document.getElementById('inputCityClient').value=dados.localidade
        document.getElementById('inputUFClient').value=dados.uf
    })
    .catch(error=>console.log(error))
}