const userCtrl = {};
const User = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//valida que no haiga usuarios registrado y resgistra el usuario nuevo 
userCtrl.addUser = async (req, res)=>{
    const user = await User.findOne({email: req.body.email});
    if(user) return res.send('Ese useario ya existe');
    //encryta password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const userDate = new User({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        password: hashPassword
    });
    await userDate.save();
    /* res.cookie('Authorization', Token, { httpOnly: true, maxAge: 25000*1000 }); */
    res.status(200).json({
        _id: userDate._id,
        nombre: userDate.nombre,
        apellido: userDate.apellido,
        email: userDate.email
    });
};

userCtrl.updateUser = async(req, res)=>{
    try{
        const AnteriorUser = await User.findById(req.params.id);
        let userDatos;
        if(req.body.password === undefined){        
            userDatos = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email
            };
        }else{
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            
            userDatos = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                password: hashPassword
            };
        }
        
        const Update = await User.findByIdAndUpdate(req.params.id, userDatos, { new: true }); // { new: true } para obtener el documento actualizado
        res.status(200).json(Update);
    } catch(error){
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
//login genera token lo guarda en el header y en una cookie en el navegador 
userCtrl.logingUser = async(req, res, next)=>{
    
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.json('Usuario o contraseña incorrectos');
    //valida password
    const validadPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validadPassword) return res.json('Usuario o contraseña incorrectos');
    
    const Token = jwt.sign({ Id: user._id, Permisos: user.Permisos }, 'dashboardndsfkjsjfjwbrjrwkgrefirwe');
    //console.log(Token);
    res.cookie('Authorization', Token, { 
        httpOnly: true, 
        maxAge: 250000*6000,
        //secure: true
  });
    res.header('Authorization', Token)
    res.status(200).json({
        'Authorization':Token
    });
};

//funcion eliminar 
userCtrl.deleteUser = async(req, res)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'Usuario eliminado' });
    }
    catch(error){
        res.json( {message: error.menssage} );
    }
};

userCtrl.viewUser = async(req, res)=>{
    const userId = req.params.id;  // Suponiendo que el ID del usuario está en los parámetros de la solicitud
    try {
        const usuario = await User.findById(userId);

        if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const userData = {
        _id: usuario._id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        password: usuario.password,
        Permisos: usuario.Permisos,
        };

        res.status(200).json(userData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

userCtrl.getUsers = async (req, res) => {
    try {
      const usuarios = await User.find(); 
  
      const Users = usuarios.map((item) => {
        const datos = {  
          _id: item._id,
          nombre: item.nombre,
          apellido: item.apellido,
          email: item.email,
          password: item.password,
          Permisos: item.Permisos,
        };
  
        return datos;
      });
  
      
      res.status(200).json(Users);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };

userCtrl.getUser = async(req, res)=>{
    try {
        await User.findById(req.params.id, (err, usuarios)=>{
            err && res.status(500).send(err.message);
            res.status(200).json(usuarios);
        }).clone().catch(function(err){ console.log(err)});
    } catch (error) {
        req.json(error);
    }
};

userCtrl.logout = async(req, res) =>{
    const cookies = req.cookies;
    const authorization = cookies.Authorization;
    const payload = jwt.verify(authorization, 'dashboardndsfkjsjfjwbrjrwkgrefirwe');
    res.cookie('Authorization', "", { httpOnly: true, maxAge: 1 });
    res.status(200).json({
        'Authorization':''
    });
};

module.exports =  userCtrl;
