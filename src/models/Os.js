const { model, Schema } = require('mongoose');

const ordemSchema = new Schema({
    nomeCliente: {
        type: String,
        required: true
    },
    foneCliente: {
        type: String,
        required: true
    },
    console: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    defeito: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Recebido', 'Em andamento', 'Aguardando peça', 'Finalizado'],
        default: 'Recebido'
    },
    valor: {
        type: String,
        required: true
    }
}, { versionKey: false });

module.exports = model('OrdensServico', ordemSchema);
