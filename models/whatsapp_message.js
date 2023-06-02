const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const whatsappSchema = new Schema({
    receiver: {
        type: Number,
        required: true
    },
    template: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['sent','failed','received'],
        required: true
    },
    direction: {
        type: String,
        enum: ['inbound','outbound'],
        required: true
    },
    body: {
        type: String,
    },
    messageId: {
        type: String,
        required: true
    }

}, {
    timestamps: true
})

var Whatsapp = mongoose.model('Whatsapp', whatsappSchema);
module.exports = Whatsapp;