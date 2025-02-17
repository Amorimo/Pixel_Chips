console.log("Processo principal")
const { app, BrowserWindow, nativeTheme } = require('electron')

// Janela Principal
let win
const createWindow = () => {
    // A linha abaixo define o tema claro ou escuro
  nativeTheme.themeSource='system'  
  win = new BrowserWindow({
    width: 800,
    height: 600,
    // autoHideMenuBar: true,
    // minimizable:false,
    resizable:false
  })

  win.loadFile('./src/views/index.html')
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