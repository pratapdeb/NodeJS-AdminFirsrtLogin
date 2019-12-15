const mongoose = require('mongoose');
const UserRoles = mongoose.model('UserRoles', new mongoose.Schema({

    role: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    }
}))
exports.UserRoles = UserRoles;