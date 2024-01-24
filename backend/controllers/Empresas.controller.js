const Empresas = require('../models/Empresas');
const EmpresasController = {};


EmpresasController.getAllEmpresa = async (req, res) => {
  try {
    const empresas = await Empresas.find();
    res.json(empresas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

EmpresasController.getEmpresaById = async (req, res) => {
  try {
    const empresaId = req.params.id; // Asume que pasas el ID como parámetro en la ruta
    const empresa = await Empresas.findById(empresaId);
    if (!empresa) {
      return res.status(404).json({ message: "Empresa no encontrada" });
    }
    res.json(empresa);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

EmpresasController.getReportes = async (req, res) => {
  try {
    const { busqueda } = req.query;
    
    let query = {};

    if (busqueda && busqueda !== "") {
      // Crear una expresión regular para hacer una búsqueda 'like' insensible a mayúsculas
      const regex = new RegExp(busqueda, 'i'); // 'i' hace que sea insensible a mayúsculas/minúsculas

      // Buscar en todos los campos usando $or para buscar en cualquiera de los campos
      query = {
        $or: [
          { nombre: regex },
          { Ubicacion: regex },
          { Telefono: regex },
          { Extensiones: regex },
          { Correo: regex },
        ],
      };
    }

    // Aquí estás buscando en la base de datos usando el modelo Empresa y el filtro que has creado
    const empresas = await Empresas.find(query).sort({ _id: -1 });
    res.json(empresas);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

EmpresasController.createEmpresa = async (req, res) => {  
  try {
      const empresa = new Empresas({
        nombre: req.body.nombre,
        Ubicacion: req.body.Ubicacion,
        Telefono: req.body.Telefono,
        Extensiones: req.body.Extensiones,
        Correo: req.body.Correo
      });
      const newEmpresa = await empresa.save();
      
      res.status(201).json(newEmpresa);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

EmpresasController.updateEmpresas = async (req, res) => {
    try {
      const updatedEmpresa = await Empresas.findByIdAndUpdate(req.params.id, { 
        nombre: req.body.nombre,
        Ubicacion: req.body.Ubicacion,
        Telefono: req.body.Telefono,
        Extensiones: req.body.Extensiones,
        Correo: req.body.Correo
      }, { new: true });
  
      res.json(updatedEmpresa);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};

EmpresasController.deleteEmpresa = async (req, res) => {
    try {

      const deletedEmpresa = await Empresas.findByIdAndDelete(req.params.id);
      res.json({ message: 'Empresa eliminada' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

module.exports = EmpresasController;