const express = require('express');
const router = express.Router();

const { createEmpresa, deleteEmpresa, getAllEmpresa, getReportes } = require('../controllers/Empresas.controller');

router.post('/', createEmpresa);

router.get('/All', getAllEmpresa);

router.get('/', getReportes);

router.delete('/:id', deleteEmpresa);

module.exports = router;