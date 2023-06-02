const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hostSchema = new Schema({
    ip: {
        type: String,
        default: '',
        required: true
    },
    connected: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
})

var Hosts = mongoose.model('Hosts', hostSchema);
module.exports = Hosts;