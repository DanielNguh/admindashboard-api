var  mongoose = require('mongoose');

var Schema = mongoose.Schema;

var User = new Schema({
    fullname: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    admin: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('User', User);