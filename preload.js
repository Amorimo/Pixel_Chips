// arquivo de pré-carregamento e reforço de segurança na comunicação entre processos (IPC)

const { contextBridge, ipcRenderer } = require('electron');

// Envia ao processo principal o pedido para conectar ao banco e trocar o ícone (ex: no index.html)
ipcRenderer.send('db-connect');

contextBridge.exposeInMainWorld('api', {
  // Navegação entre janelas
  clientWindow: () => ipcRenderer.send('client-Window'),
  osWindow: () => ipcRenderer.send('os-Window'),
  estoqueWindow: () => ipcRenderer.send('estoque-Window'),
  financeiroWindow: () => ipcRenderer.send('financeiro-Window'),

  // Status da conexão com o banco
  dbStatus: (message) => ipcRenderer.on('db-status', message),

  // Cadastro de cliente
  newClient: (client) => ipcRenderer.send('new-client', client),

  // Reseta o form de cliente
  resetForm: (callback) => ipcRenderer.on('reset-form', callback),

  // Cadastro de Ordem de Serviço
  newOS: (osData) => ipcRenderer.send('new-os', osData),

  // Reseta o form de OS
  resetFormOS: (callback) => ipcRenderer.on('reset-form-os', callback),
});
