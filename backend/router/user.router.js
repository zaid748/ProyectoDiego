const express = require('express');
const router = express.Router();

const { addUser, deleteUser, logingUser, logout, updateUser, viewUser, getUser,getUsers } = require('../controllers/user.controller');
const {authToke} = require('../middleware/auth');

router.post('/singin', logingUser);
//Agrega usuario con token para validar que solo pueda logiarce en un solo dispositivo 
router.post('/singup', addUser);

router.get('/logout', logout);

router.get('/leerToken', authToke); 
//Obtiene Todos los usuarios
router.get('/getUsers', getUsers);

router.get('/:id', viewUser);

router.delete('/:id/:user', deleteUser);

router.put('/:id', updateUser);

module.exports = router;