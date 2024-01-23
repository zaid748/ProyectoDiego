import React, {useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import Footer from '../Footer';

const User = ()=> {
    const { id } = useParams();

    const [Nombre, setNombre] = useState('');
    const [Apellido, setApellido] = useState('');
    const [Usuario, setUsuario] = useState('');
    const [Password, setPassword] = useState('');
    const [confPassword, setconfPassword] = useState('');

    const putUser = async (e) => {
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
            if(Password===confPassword){
                if(Password === ''){
                    await axios.put(`${process.env.REACT_APP_HOST}/User/${id}`, { email: Usuario, nombre: Nombre, apellido: Apellido }).then((e) => {
                        const label = document.getElementById('labelGuardado');
                        const backgroundAlerts = document.getElementById('backgroundAlerts');
                        label.classList.remove('none');
                        backgroundAlerts.classList.remove('none');
                    });
                }else{
                    await axios.put(`${process.env.REACT_APP_HOST}/User/${id}`, { email: Usuario, nombre: Nombre, apellido: Apellido, password: Password}).then((e) => {
                        const label = document.getElementById('labelGuardado');
                        const backgroundAlerts = document.getElementById('backgroundAlerts');
                        label.classList.remove('none');
                        backgroundAlerts.classList.remove('none');
                    });
                }
            }else{
                const label = document.getElementById('labelError');
                const backgroundAlerts = document.getElementById('backgroundAlerts');
                label.classList.remove('none');
                backgroundAlerts.classList.remove('none');
                const list = document.getElementById('textoError');
                list.innerHTML = `Las Contraseñas no coinciden, favor de volverlas a ingresar.`;
            }
           
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
    const getData = async()=>{
        try {
            const res = (await axios.get(`${process.env.REACT_APP_HOST}/User/${id}`)).data;

            setNombre(res.nombre);
            setApellido(res.apellido);
            setUsuario(res.email);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(()=>{
        getData();
    })
    const goBack = () => {
        // Puedes utilizar el objeto history para volver a la página anterior
        window.history.back();
      };
    return (
        <div>
            <div className='infoAbout oh-flex oh-center'>
                <form className='formCustomers oh-flex oh-center' onSubmit={putUser}>
                    <div className='backgroundAlerts none' id='backgroundAlerts'></div>
                    <span className="oh-flex oh-center letAlerta none" id="labelGuardado">
                        <span className="width100" id="textoAlerta">Informancion Guardada</span>
                        <span className="oh-flex oh-center btncerrar padding-1" id="xCerrar" onClick={cerrar}>x</span>
                        <span className="oh-flex oh-center btnAcceptAlert padding-1" onClick={aceptar}>Aceptar</span>
                    </span>
                    <span className="oh-flex oh-center letAlerta none" id="labelError">
                        <img src='/img/advertence.svg' alt='alerta'></img>
                        <span className="width100" id="textoError">Producto Guardado</span>
                        <span className="oh-flex oh-center btncerrar padding-1" id="xCerrar" onClick={cerrarError}>x</span>
                        <span className="oh-flex oh-center btnAcceptAlert padding-1" onClick={aceptarError}>Aceptar</span>
                    </span>
                    <h1 className='txtBlueL txtBatangas'>Alta de Usuarios</h1>
                    <div className='contendorInputs'>
                    <div className='inputForm'>
                        <label className='labelForm oh-flex'>Nombre</label>
                        <input 
                        id='Nombre'
                        data-label='Nombre'
                        value={Nombre} 
                        onChange={ e=> setNombre(e.target.value)}
                        className='inputRound oh-flex obligatorio' type="text"/>
                        <button className='btnForm' id='btnuser' style={{  margin: "2rem" }}>Buscar</button>
                    </div>
                    <div className='inputForm'>
                        <label className='labelForm oh-flex'>Apellido</label>
                        <input 
                        id='apellido'
                        data-label='Apellido'
                        value={Apellido} 
                        onChange={ e=> setApellido(e.target.value)}
                        className='inputRound oh-flex obligatorio' type="text" />
                    </div>
                    <div className='inputForm'>
                        <label className='labelForm oh-flex'>Usuario</label>
                        <input 
                        id='Usuario'
                        data-label='Usuario'
                        value={Usuario} 
                        onChange={ e=> setUsuario(e.target.value)}
                        className='inputRound oh-flex obligatorio' type="text" />
                    </div>
                    <div className='inputForm'>
                        <label className='labelForm oh-flex'>Contraseña</label>
                        <input 
                        id='Password'
                        data-label='Contraseña'
                        value={Password} 
                        onChange={ e=> setPassword(e.target.value)}
                        className='inputRound oh-flex' type="password" />
                    </div>
                    <div className='inputForm'>
                        <label className='labelForm oh-flex'>Repetir Contraseña</label>
                        <input 
                        id='confPassword'
                        data-label='Repetir Contraseña'
                        value={confPassword} 
                        onChange={ e=> setconfPassword(e.target.value)}
                        className='inputRound oh-flex' type="password" />
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

export default User;