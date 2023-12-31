const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const resourceSchema = new Schema({
    resource: {
        type: String,
        enum: ['RAM', 'CPU', 'Disk'],
        required: true
    },
    value: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

var Resources = mongoose.model('Resources', resourceSchema);
module.exports = Resources;