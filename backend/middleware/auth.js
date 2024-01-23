const jwt = require('jsonwebtoken');
const auth = {};

auth.authToke = async(req, res, next)=>{
    try{
        const cookies = req.cookies;
        const authorization = cookies.Authorization;
        if(!authorization) return res.json('Acceso Denegado. No hay Token');
        const payload = jwt.verify(authorization, 'dashboardndsfkjsjfjwbrjrwkgrefirwe');
        if(!payload) return res.json('El token no es valido');
        res.json(payload);
    }catch(err){
        res.json('Acceso Denegado. Token no valido');
    }
};


auth.Validad = async(req, res, next)=>{
    try{
        const cookies = req.cookies;
        const authorization = cookies.Authorization;
        if(!authorization) return res.json('Acceso Denegado. Necesitamos un token valido');

        const payload = jwt.verify(authorization, 'dashboardndsfkjsjfjwbrjrwkgrefirwe');
        if(!payload) return res.json('El token no es valido');
        req.user = payload;
        next();
    }catch(err){
        res.json('Acceso Denegado. Token no valido')
    }
};

module.exports = auth;