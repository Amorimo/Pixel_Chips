const { model, Schema } = require('mongoose');

const estoqueSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    codigo: {
        type: String,
        required: true,
        unique: true
    },
    quantidade: {
        type: Number,
        required: true
    },
    preco: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    }
}, { versionKey: false });

module.exports = model('Estoque', estoqueSchema);
