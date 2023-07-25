const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const containerSchema = new Schema({
    name: {
        type: String,
        default: '',
        required: true
    },
    status: {
        type: String,
        enum: ['running','exited','restarting','paused'],
        required: true
    },
    containerId: {
        type: String,
        default: '',
        required: true
    }
}, {
    timestamps: true
})

var Containers = mongoose.model('Containers', containerSchema);
module.exports = Containers;