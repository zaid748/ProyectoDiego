import React, {useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../Footer';
import { useParams } from "react-router-dom";
const EmpresaActualizacion = ()=> {

    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [Ubicacion, setUbicacion] = useState('');
    const [Telefono, setTelefono] = useState('');
    const [Extensiones, setExtensiones] = useState('');
    const [Correo, setCorreo] = useState('');

    const getData = async ()=>{
        try {
            const res = (await axios.get(`${process.env.REACT_APP_HOST}/Empresas/${id}`)).data
            console.log(res)
            setNombre(res.nombre);
            setUbicacion(res.Ubicacion);
            setTelefono(res.Telefono);
            setExtensiones(res.Extensiones);
            setCorreo(res.Correo);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getData();
    }, [])

    const registerUser = async (e) => {
        try {
          e.preventDefault();
          let camposObligatorios = document.querySelectorAll('.obligatorio');
          let camposVacios = false;
          let campoFaltante = ''; 
    
          camposObligatorios.forEach((campo) => {
            if (campo.value === '') {
              camposVacios = true;
              campoFaltante = campo.getAttribute('data-label');
            }
          });
    
          if (!camposVacios) {
            await axios.put(`${process.env.REACT_APP_HOST}/Empresas/${id}`, { nombre, Ubicacion, Telefono, Extensiones, Correo});
            const label = document.getElementById('labelGuardado');
            const backgroundAlerts = document.getElementById('backgroundAlerts');
            label.classList.remove('none');
            backgroundAlerts.classList.remove('none');
          } else {
            const label = document.getElementById('labelError');
            const backgroundAlerts = document.getElementById('backgroundAlerts');
            label.classList.remove('none');
            backgroundAlerts.classList.remove('none');
            const list = document.getElementById('textoError');
            list.innerHTML = `El campo "${campoFaltante}" está vacío. Por favor llena todos los campos obligatorios.`;
          }
        } catch (error) {
          const label = document.getElementById('labelError');
          const backgroundAlerts = document.getElementById('backgroundAlerts');
          label.classList.remove('none');
          backgroundAlerts.classList.remove('none');
          const list = document.getElementById('textoError');
          list.innerHTML = 'Ocurrió un error, inténtalo de nuevo más tarde';
          console.log({ error: error.message });
        }
      };
    
    function cerrar(){
        const input = document.getElementById('labelGuardado');
        const backgroundAlerts = document.getElementById('backgroundAlerts');
        backgroundAlerts.classList.add('none');
        input.classList.add('none');
        return window.location.reload();
    }
    
    function aceptar(){
        const input = document.getElementById('labelGuardado');
        const backgroundAlerts = document.getElementById('backgroundAlerts');
        backgroundAlerts.classList.add('none');
        input.classList.add('none');
        return window.location.reload();
    }
    
    function cerrarError() {
        const input = document.getElementById('labelError');
        const backgroundAlerts = document.getElementById('backgroundAlerts');
        backgroundAlerts.classList.add('none');
        input.classList.add('none');
    }

    function aceptarError() {
        const input = document.getElementById('labelError');
        const backgroundAlerts = document.getElementById('backgroundAlerts');
        backgroundAlerts.classList.add('none');
        input.classList.add('none');
    }
    const goBack = () => {
        // Puedes utilizar el objeto history para volver a la página anterior
        window.history.back();
      };
    return (
        <div>
            <div className='infoAbout oh-flex oh-center'>
                <form className='formCustomers oh-flex oh-center' onSubmit={registerUser}>
                    <div className='backgroundAlerts none' id='backgroundAlerts'></div>
                        <span className="oh-flex oh-center letAlerta none" id="labelGuardado">
                            <span className="width100" id="textoAlerta">Informancion Guardada</span>
                            <span className="btncerrar padding-1" id="xCerrar" onClick={cerrar}>x</span>
                            <span className="oh-flex oh-center btnAcceptAlert padding-1" onClick={aceptar}>Aceptar</span>
                        </span>
                        <span className="oh-flex oh-center letAlerta none" id="labelError">
                            {/* <img src='/iconos/advertence.svg'></img> */}
                            <span className="width100" id="textoError">Producto Guardado</span>
                            <span className="btncerrar padding-1" id="xCerrar" onClick={cerrarError}>x</span>
                            <span className="oh-flex oh-center btnAcceptAlert padding-1" onClick={aceptarError}>Aceptar</span>
                        </span>
                        <h1 className='txtBlueL txtBatangas'>Alta de Empresas</h1>
                        <div className='contendorInputs'>
                            <div className='inputForm'>
                                <label className='labelForm oh-flex'>Nombre de la empresa</label>
                                <input 
                                id='Nombre'
                                data-label='Nombre'
                                value={nombre} 
                                onChange={ e=> setNombre(e.target.value)}
                                className='inputRound oh-flex obligatorio' type="text"/>
                            </div>
                            <div className='inputForm'>
                                <label className='labelForm oh-flex'>Ubicación</label>
                                <input 
                                id='Ubicacion'
                                data-label='Ubicacion'
                                value={Ubicacion} 
                                onChange={ e=> setUbicacion(e.target.value)}
                                className='inputRound oh-flex obligatorio' type="text" />
                            </div>
                            <div className='inputForm'>
                                <label className='labelForm oh-flex'>Teléfono</label>
                                <input 
                                id='Telefono'
                                data-label='Telefono'
                                value={Telefono} 
                                onChange={ e=> setTelefono(e.target.value)}
                                className='inputRound oh-flex obligatorio' type="tel" />
                            </div>
                            <div className='inputForm'>
                                <label className='labelForm oh-flex'>Extensiones</label>
                                <input 
                                id='Extensiones'
                                data-label='Extensiones'
                                value={Extensiones} 
                                onChange={ e=> setExtensiones(e.target.value)}
                                className='inputRound oh-flex obligatorio' type="text" />
                            </div>
                            <div className='inputForm'>
                                <label className='labelForm oh-flex'>Correo</label>
                                <input 
                                id='Correo'
                                data-label='Correo'
                                value={Correo} 
                                onChange={ e=> setCorreo(e.target.value)}
                                className='inputRound oh-flex obligatorio' type="email" />
                            </div>
                        </div>
                    <div className='oh-flex' id='divuser'>
                        <button className='btnForm' id='btnuser' type='submit' style={{  margin: "2rem" }}>Guardar</button>
                        <button className='btnForm' onClick={goBack} style={{  marginRight: "10rem" }}>Volver</button>
                    </div>
                </form>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default EmpresaActualizacion;