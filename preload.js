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
  renderOS: (dataOS) => ipcRenderer.on('render-os', dataOS),
  validateClient: () => ipcRenderer.send('validate-client'),



  // Cadastro de Financeiro
  newFinanceiro: (financeiroData) => ipcRenderer.send('new-financeiro', financeiroData),
  resetFormFinanceiro: (callback) => ipcRenderer.on('reset-form-financeiro', callback),

  // Cadastro de Estoque
  newEstoque: (estoqueData) => ipcRenderer.send('new-estoque', estoqueData),
  resetFormEstoque: (callback) => ipcRenderer.on('reset-form-estoque', callback),

  // Busca Cliente
  searchName: (name) => ipcRenderer.send('search-name', name),
  renderClient: (dataClient) => ipcRenderer.on('render-client', dataClient),
  validateSearch: () => ipcRenderer.send('validate-search'),
  setClient: (args) => ipcRenderer.on('set-client', args),
  deleteClient: (id) => ipcRenderer.send('delete-client', id),
  updateClient: (client) => ipcRenderer.send('update-client', client),
  searchClients: () => ipcRenderer.send('search-clients'),
  listClients: (clients) => ipcRenderer.on('list-clients', clients),
  searchOS: () => ipcRenderer.send('search-os'),
  setSearch: (args) => ipcRenderer.on('set-search', args),
});
