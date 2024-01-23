const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'resources/Logos/');
    },
    filename: function (req, file, cb) {
        if (file.mimetype == "image/png") {
            req.nameImagen = `${file.originalname}.png`;
            cb(null, `${file.originalname}.png`);
        }else if(file.mimetype == "image/jpg"){
            req.nameImagen = `${file.originalname}.jpg`;
            cb(null, `${file.originalname}.jpg`);  
        }else if(file.mimetype == "image/jpeg"){
            req.nameImagen = `${file.originalname}.jpeg`;
            cb(null, `${file.originalname}.jpeg`);
        }
    }
});

const UpImagen = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

module.exports = {UpImagen};