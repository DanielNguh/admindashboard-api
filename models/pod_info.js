const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const podSchema = new Schema({
    name: {
        type: String,
        default: '',
        required: true
    },
    status: {
        type: String,
        enum: ['running','exited','restarting'],
        required: true
    },
    namespace: {
        type: String,
        default: '',
        required: true
    }
}, {
    timestamps: true
})

var Pods = mongoose.model('Pods', podSchema);
module.exports = Pods;