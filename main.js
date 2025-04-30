console.log("Processo principal")
const { app, BrowserWindow, nativeTheme, Menu, ipcMain } = require('electron')

// Linha relacionada ao preload.js
const path = require('node:path')

const { shell } = require('electron')




// Importação dos métodos conectar e desconectar (módulo de conexão)
const {conectar, desconectar}=require('./database.js')

// Importação do Schema Clientes da camada model
const clientModel=require('./src/models/Clientes.js')

const osModel = require('./src/models/Os.js')

const estoqueModel = require('./src/models/Estoque.js');

const Financeiro = require('./src/models/Financeiro.js');


// Importação do pacote jspdf (npm i jspdf)
const { jspdf, default: jsPDF } = require('jspdf')

// Importação da biblioteca fs (nativa do JavaScript) para manipulação de arquivos (no caso arquivos pdf)
const fs = require('fs')

// Janela Principal
let win
const createWindow = () => {
    // A linha abaixo define o tema claro ou escuro
  nativeTheme.themeSource='system'  
  win = new BrowserWindow({
    width: 1010,
    height: 720,
    // autoHideMenuBar: true,
    // minimizable:false,
    resizable:false,
    webPreferences:{
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // Menu personalizado
  Menu.setApplicationMenu(Menu.buildFromTemplate(template))

  win.loadFile('./src/views/index.html')
}

  ipcMain.on('client-Window',() => {
    clientWindow()
  });

  ipcMain.on('os-Window',() => {
    osWindow()
  })

  ipcMain.on('estoque-Window',()=>{
    estoqueWindow()
  })

  ipcMain.on('financeiro-Window',()=>{
    financeiroWindow()
  })

// Janela sobre
function aboutWindow(){
  nativeTheme.themeSource='system'
  // A linha abaixo obtem a janela principal
  const main= BrowserWindow.getFocusedWindow()
  let about
  // Estabelecer uma relação hierárquica entre janelas
  if (main){
    // Criar a janela sobre
    about=new BrowserWindow({
      width: 360,
      height: 200,
      autoHideMenuBar:true,
      resizable:false,
      minimizable:false,
      parent:main,
      modal:true

    })
  }
  // Carregar o documento html na janela
  about.loadFile('./src/views/sobre.html')
}

// Janela Clientes
let client
function clientWindow(){
  nativeTheme.themeSource='system'
  const main=BrowserWindow.getFocusedWindow()
  if(main){
    client=new BrowserWindow({
      width:800,
      height:600,
      // autoHideMenuBar: true,
      resizable: false,
      parent:main,
      modal: true,
      // ativar preload.js
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')}
    })
  }
  client.loadFile('./src/views/cliente.html')
  client.center() // Iniciar no centro da tela
}

// Janela OS
let os
function osWindow(){
  nativeTheme.themeSource='system'
  const main=BrowserWindow.getFocusedWindow()
  if(main){
    os=new BrowserWindow({
      width:1010,
      height:720,
      resizable: false,
      parent:main,
      modal:true,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })
  }
  os.loadFile('./src/views/os.html')
  os.center() // Iniciar no centro da tela
}

// Janela Estoque
function estoqueWindow() {
  nativeTheme.themeSource = 'system';
  const main = BrowserWindow.getFocusedWindow(); 
  if (main) {
    estoque = new BrowserWindow({
      width: 1010,
      height: 720,
      resizable: false,
      parent: main,
      modal: true,
      webPreferences:{
        preload: path.join(__dirname, 'preload.js')
      }
    });
  }
  estoque.loadFile('./src/views/estoque.html');
  estoque.center();
}

// Janela Financeiro
function financeiroWindow(){
  nativeTheme.themeSource='system'
  const main = BrowserWindow.getFocusedWindow()
  if(main){
    financeiro=new BrowserWindow({
      width:1010,
      height:720,
      resizable:false,
      parent:main,
      modal:true,
      webPreferences:{
        preload: path.join(__dirname, 'preload.js')
      }
    })
  }
  financeiro.loadFile('./src/views/financeiro.html')
  financeiro.center()
}

// Iniciar a aplicação
app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
      }
    })
  })
  
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  // Reduzir log não criticos
  app.commandLine.appendSwitch('log-level','3')

  // Iniciar a conexão com o banco de dados (Pedido direto do preload.js)
ipcMain.on('db-connect', (event)=>{
  let conectado=conectar()
  // Se conectado for igual a true 
  if (conectado){
      // Enviar uma mensgaem para o renderizado poder trocar o ícone, criar um delay de 0.5s para sincronizar a nuvem
      setTimeout(() => {
          event.reply('db-status', "conectado")  
      }, 500); //500ms
     
  }
})



// Importante! Desconectar do banco de dados quando a aplicação for encerrada
app.on('before-quit',()=>{
   desconectar()
})

  // Template do menu
const template = [
  {
      label: 'Cadastro',
      submenu: [
          {
              label: 'Clientes',
              click: () => clientWindow()
          },
          {
              label: 'OS',
              click: () => osWindow()
          },
          {
              type: 'separator'
          },
          {
            label: 'Recarregar',
            role:'reload',
            accelerator: 'F5'
          },
          {
              label: 'Sair',
              click: () => app.quit(),
              accelerator: 'Alt+F4'
          }
      ]
  },
  {
      label: 'Relatórios',
      submenu:[
        {
          label:'Clientes',
          click:()=>relatorioClientes()
        },
        {
          label:'OS Abertas',
          click:()=> relatorioOS('Aberta')
        },
        {
          label:'OS Concluídas',
          click:()=> relatorioOS('Concluída')
        },        
        {
          label:'Estoque',
          click:()=>estoqueWindow()
        },
        {
          label:'Financeiro',
          click:()=>financeiroWindow()
        }
      ]
  },    
  {
      label: 'Ferramentas',
      submenu: [
        {
          label: 'Aplicar zoom',
          role: 'zoomIn'
      },
      {
          label: 'Reduzir',
          role: 'zoomOut'
      },
      {
          label: 'Restaurar o zoom padrão',
          role: 'resetZoom'
      },
      {
          type: 'separator'
      },
      {
          label: 'Recarregar',
          role: 'reload',
          accelerator:'F5'
      },
      {
          label: 'Ferramentas do desenvolvedor',
          role: 'toggleDevTools'
      }
      ]
  },
  {
      label: 'Ajuda',
      submenu: [
          {
              label: 'Sobre',
              click:()=> aboutWindow()
          }
      ]
  }
]
// ====================================================================================================
// Clientes - CRUD Create

// Recebimento do objeto que contém os daods do cliente
ipcMain.on('new-client', async(event,client)=>{
  // Importante! Teste de recebimento dos dados do cliente
  console.log(client)

  // Cadastrar a estrutura de dados no banco de dados MongoDB
  try{
      // Criar nova estrutura de dados usando a class modelo
      // Importante! Os atributos precisam ser identicos ao modelo de dados Cliente.js
      const newClient=new clientModel({
          nomeCliente:client.nameCli,
          cpfCliente:client.cpfCli,
          emailCliente:client.emailCli,
          foneCliente:client.phoneCli,
          cepCliente:client.cepClient,
          logradouroCliente:client.addressCli,
          numeroCliente:client.numberCli,
          complementoCliente:client.complementCli,
          bairroCliente:client.neighborhoodCli,
          cidadeCliente:client.cityCli,
          ufCliente:client.ufCli
      })
      await newClient.save()    
   // Mensagem de confirmação
   dialog.showMessageBox({
      //customização
      type: 'info',
      title: "Aviso",
      message: "Cliente adicionado com sucesso",
      buttons: ['OK']
  }).then((result) => {
      //ação ao pressionar o botão (result = 0)
      if (result.response === 0) {
          //enviar um pedido para o renderizador limpar os campos e resetar as configurações pré definidas (rótulo 'reset-form' do preload.js
          event.reply('reset-form')
      }
  })
} catch (error) {
  // se o código de erro for 11000 (cpf duplicado) enviar uma mensagem ao usuário
  if (error.code === 11000) {
      dialog.showMessageBox({
          type: 'error',
          title: "Atenção!",
          message: "CPF já está cadastrado\nVerifique se digitou corretamente",
          buttons: ['OK']
      }).then((result) => {
          if (result.response === 0) {
              // limpar a caixa de input do cpf, focar esta caixa e deixar a borda em vermelho
          }
      })
  }
  console.log(error)
}
})

// == Fim - Clientes - CRUD Create
// ============================================================


// ============================================================
// == Relatório de clientes ===================================

async function relatorioClientes() {
try {
  // Passo 1: Consultar o banco de dados e obter a listagem de clientes cadastrados por ordem alfabética
  const clientes = await clientModel.find().sort({ nomeCliente: 1 })
  // teste de recebimento da listagem de clientes
  //console.log(clientes)
  // Passo 2:Formatação do documento pdf
  // p - portrait | l - landscape | mm e a4 (folha A4  210x 297mm)
  const doc = new jsPDF('p', 'mm', 'a4')
  //Inserir imagem do documento PDF
  // imagePath (caminho da imagem que será inserida no pdf)
  // imageBase64 (uso da bibilioteca fs para ler o arquivo no formato png)
  const imagePath = path.join(__dirname,'src','public','img','logo.png')
  const imageBase64 = fs.readFileSync(imagePath,{encoding:'base64'})
  doc.addImage(imageBase64, 'PNG', 5,8) // (5em, 8mm x,y)

  // definir o tamanho da fonte (tamanho equivalente ao word)
  doc.setFontSize(18)
  // escrever um texto (título)
  doc.text("Relatório de clientes", 14, 45)//x, y (mm)
  // inserir a data atual no relatório
  const dataAtual = new Date().toLocaleDateString('pt-BR')
  doc.setFontSize(12)
  doc.text(`Data: ${dataAtual}`, 165, 10)
  // variável de apoio na formatação
  let y = 60
  doc.text("Nome", 14, y)
  doc.text("Telefone", 80, y)
  doc.text("E-mail", 130, y)
  y += 5
  // desenhar uma linha
  doc.setLineWidth(0.5) // expessura da linha
  doc.line(10, y, 200, y) // 10 (inicio) ---- 200 (fim)
  // Renderizar os clientes cadastrados no banco
  y+=10 // Espaçamento da linha
  // Percorres o vetor 
  clientes.forEach((c)=>{
      // Adicionar outra página se a folha inteira for preechida (estratégia é saber o tamanho da folha)
      // Folha A4 tem y=297mm
      if (y > 280){
          doc.addPage()
          y=20 // Resetar a variável y

          doc.text("Nome",14,y)
          doc.text("Telefone",80,y)
          doc.text("E-mail",139,y)
          y+=5
          doc.setLineWidth(0.5)
          doc.line(10,y,200,y)
          y+=10
      }
      doc.text(c.nomeCliente, 14,y)
      doc.text(c.foneCliente, 80,y)
      doc.text(c.emailCliente || "N/A", 130,y)
      y+=10 // Quebra linha
  })

   // Adicionar numeração automática de páginas
   const paginas=doc.internal.getNumberOfPages()
   for(let i = 1; i <= paginas; i++){
       doc.setPage(i)
       doc.setFontSize(10)
       doc.text(`Página ${i} de ${paginas}`,105,290,{align:'center'})
   }

  // Definir o caminho do arquivo temporário e nome do arquivo
  const tempDir = app.getPath('temp')
  const filePath = path.join(tempDir, 'clientes.pdf')
  // Renderizar os clientes cadastrados no banco

  // salvar temporariamente o arquivo
  doc.save(filePath)
  // abrir o arquivo no aplicativo padrão de leitura de pdf do computador do usuário
  shell.openPath(filePath)
} catch (error) {
  console.log(error)
}
}

// == Fim - relatório de clientes =============================
// ============================================================

// ====================================================================================================
// Os - CRUD Create
ipcMain.on('new-os', async (event, osData) => {
  console.log("Nova OS recebida:", osData);

  try {
    const novaOS = new osModel({
      nomeCliente: osData.nomeCliente,
      foneCliente: osData.foneCliente,
      console: osData.console,
      modelo: osData.modelo,
      defeito: osData.defeito,
      status: osData.status,
      valor: osData.valor,
      dataEntrada: new Date(),
      dataConclusao: '',
      idCliente: osData.idCliente || ''
    });

    await novaOS.save();

    event.reply('reset-form-os'); // avisa o renderer pra resetar form
  } catch (error) {
    console.error("Erro ao salvar OS:", error);
  }
});


// == Fim -Os - CRUD Create
// ============================================================
// ====================================================================================================
// Estoque - CRUD Create
ipcMain.on('new-estoque', async (event, estoqueData) => {
  console.log("Novo item de estoque recebido:", estoqueData);

  try {
    const novoEstoque = new estoqueModel({
      nome: estoqueData.nome,
      quantidade: estoqueData.quantidade,
      preco: estoqueData.preco,
      descricao: estoqueData.descricao,
      codigo: estoqueData.codigo,
      categoria: estoqueData.categoria,
      dataEntrada: new Date()
    });

    await novoEstoque.save();

    event.reply('reset-form-estoque'); // avisa o renderer pra limpar o formulário
  } catch (error) {
    console.error("Erro ao salvar item de estoque:", error);
  }
});
// == Fim Estoque CRUD Create
// ====================================================================================================

// ====================================================================================================
// Financeiro - CRUD Create
ipcMain.on('new-financeiro', async (event, financeiroData) => {
  console.log("Novo lançamento financeiro recebido:", financeiroData);

  try {
    const novoLancamento = new Financeiro({
      tipo: financeiroData.tipo, // 'Receita' ou 'Despesa'
      descricao: financeiroData.descricao,
      valor: financeiroData.valor,
      data: financeiroData.data ? new Date(financeiroData.data) : new Date()
    });

    await novoLancamento.save();

    event.reply('reset-form-financeiro'); // avisa o renderer pra limpar o formulário
  } catch (error) {
    console.error("Erro ao salvar lançamento financeiro:", error);
  }
});
// == Fim Financeiro CRUD Create
// ====================================================================================================

// ====================================================================================================
// Relatório de Estoque
async function relatorioEstoque() {
  try {
    const estoque = await estoqueModel.find().sort({ nome: 1 });

    const doc = new jsPDF('p', 'mm', 'a4');

    const imagePath = path.join(__dirname, 'src', 'public', 'img', 'logo.png');
    const imageBase64 = fs.readFileSync(imagePath, { encoding: 'base64' });
    doc.addImage(imageBase64, 'PNG', 5, 8);

    doc.setFontSize(18);
    doc.text("Relatório de Estoque", 14, 45);

    const dataAtual = new Date().toLocaleDateString('pt-BR');
    doc.setFontSize(12);
    doc.text(`Data: ${dataAtual}`, 165, 10);

    let y = 60;
    doc.text("Nome", 14, y);
    doc.text("Quantidade", 80, y);
    doc.text("Preço", 140, y);
    y += 5;
    doc.setLineWidth(0.5);
    doc.line(10, y, 200, y);
    y += 10;

    estoque.forEach((item) => {
      if (y > 280) {
        doc.addPage();
        y = 20;

        doc.text("Nome", 14, y);
        doc.text("Quantidade", 80, y);
        doc.text("Preço", 140, y);
        y += 5;
        doc.setLineWidth(0.5);
        doc.line(10, y, 200, y);
        y += 10;
      }
      doc.text(item.nome, 14, y);
      doc.text(item.quantidade.toString(), 80, y);
      doc.text(`R$ ${item.preco.toFixed(2)}`, 140, y);
      y += 10;
    });

    const paginas = doc.internal.getNumberOfPages();
    for (let i = 1; i <= paginas; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(`Página ${i} de ${paginas}`, 105, 290, { align: 'center' });
    }

    const tempDir = app.getPath('temp');
    const filePath = path.join(tempDir, 'estoque.pdf');

    doc.save(filePath);

    shell.openPath(filePath);
  } catch (error) {
    console.error(error);
  }
}
// == Fim Relatório de Estoque
// ====================================================================================================
