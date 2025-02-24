console.log("Processo principal")
const { app, BrowserWindow, nativeTheme, Menu } = require('electron')

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
    resizable:false
  })

  // Menu personalizado
  Menu.setApplicationMenu(Menu.buildFromTemplate(template))

  win.loadFile('./src/views/index.html')
}

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

  // Template do menu
const template = [
  {
      label: 'Cadastro',
      submenu: [
          {
              label: 'Clientes'
          },
          {
              label: 'OS'
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
          label:'Clientes'
        },
        {
          label:'OS Abertas'
        },
        {
          label:'OS Concluídas'
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