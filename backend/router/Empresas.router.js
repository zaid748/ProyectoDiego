const express = require('express');
const router = express.Router();

const { createEmpresa, deleteEmpresa, getAllEmpresa, getReportes, updateEmpresas, getEmpresaById } = require('../controllers/Empresas.controller');

router.post('/', createEmpresa);

router.get('/All', getAllEmpresa);

router.get('/', getReportes);

router.get('/:id', getEmpresaById);

router.put('/:id', updateEmpresas);

router.delete('/:id', deleteEmpresa);

module.exports = router;