const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config({ path: '.env' });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Configuración de CORS para permitir múltiples dominios
const allowedOrigins = [ "http://localhost:3000", "http://localhost:8000", "http://itcjdirectorioweb.website"];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
    credentials: true
};

// Aplicar configuración CORS
app.use(cors(corsOptions));

// Configuración adicional de encabezados para CORS
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }

    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
//puerto
app.set('port', process.env.PORT || 8000);

//Middlewares
//app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.json());
//router

app.use('/User', require('./router/user.router'));

app.use('/Empresas', require('./router/Empresas.router'));

module.exports = app;