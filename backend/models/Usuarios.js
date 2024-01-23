const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    nombre:{ type: String, required: true},
    apellido:{ type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});




module.exports = model('Usuarios', UserSchema);