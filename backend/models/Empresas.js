const { Schema, model } = require('mongoose');

const EmpresaSchema = new Schema({
    nombre:{ type: String, required: true},
    Ubicacion:{ type: String, required: true},
    Telefono: { type: String, required: true },
    Extensiones: { type: String, required: true },
    Correo: { type: String, required: true }
});




module.exports = model('Empresa', EmpresaSchema);