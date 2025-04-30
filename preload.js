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
  resetForm: (callback) => ipcRenderer.on('reset-form', callback),

  // Cadastro de Ordem de Serviço
  newOS: (osData) => ipcRenderer.send('new-os', osData),
  resetFormOS: (callback) => ipcRenderer.on('reset-form-os', callback),

  // Cadastro de Financeiro
  newFinanceiro: (financeiroData) => ipcRenderer.send('new-financeiro', financeiroData),
  resetFormFinanceiro: (callback) => ipcRenderer.on('reset-form-financeiro', callback),

  // Cadastro de Estoque
  newEstoque: (estoqueData) => ipcRenderer.send('new-estoque', estoqueData),
  resetFormEstoque: (callback) => ipcRenderer.on('reset-form-estoque', callback)
});
