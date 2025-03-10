// arquivo de pre carregamento e reforço de segurança na comunicação entre processos (IPC)

//const { contextBridge, ipcRenderer } = require("electron")

// importaçao dos recursos do framework
// contextbridge segunrança | ipcrenderer comunicação
const {contextBridge,ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('api',{
    clientWindow: () => ipcRenderer.send('client-Window'),
    osWindow: () => ipcRenderer.send('os-Window')
})