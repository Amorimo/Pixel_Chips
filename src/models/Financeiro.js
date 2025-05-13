const { model, Schema } = require('mongoose');

const financeiroSchema = new Schema({
    tipo: {
        type: String,
        enum: ['receita', 'despesa'],
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    valor: {
        type: Number,
        required: true
    },
    data: {
        type: Date,
        required: true
    }
}, { versionKey: false });

module.exports = model('Financeiro', financeiroSchema);
