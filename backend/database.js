const mongose =require('mongoose');

const { NOTES_APP_MONGODB_HOST } = process.env;

mongose.set('strictQuery', true);

mongose.connect('mongodb://127.0.0.1/DiegoProyecto')
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));