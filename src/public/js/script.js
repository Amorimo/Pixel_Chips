// Data atualizada no rodapé
function obterData(){
    const dataAtual=new Date()
    const options={
        weekday:'long',
        year:'numeric',
        month:'long',
        day:'numeric'
    }
    return dataAtual.toLocaleDateString('pt-br', options)
}
// Executar a função ao iniciar o aplicativo (Janela principal)
document.getElementById('dataAtual').innerHTML=obterData()