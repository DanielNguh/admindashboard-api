const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const logSchema = new Schema({
    type: {
        type: String,
        default: '',
        required: true
    },
    severity: {
        type: String,
        enum: ['high', 'low', 'moderate'],
        required: true
    },
    errorMessage: {
        type: String,
        default: '',
        required: true
    }
}, {
    timestamps: true
})

var Logs = mongoose.model('Logs', logSchema);
module.exports = Logs;