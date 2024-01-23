import React, { useState } from 'react';
import axios from 'axios';

const url = `${process.env.REACT_APP_HOST}/User/singin`;

const Log = ()=> {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const user = async (e) =>{
        e.preventDefault();        
        try{
            const res = (await axios.post(url, { email: email, password:password}, {withCredentials: true})).data;
            if(res === 'Usuario o contraseña incorrectos'){
                const label = document.getElementById('labelError');
                const backgroundAlerts = document.getElementById('backgroundAlerts');

                label.classList.remove('none');
                backgroundAlerts.classList.remove('none');
                
                const list = document.getElementById('textoError');
                list.innerHTML = 'Usuario o contraseña incorrectos. Por favor, intente nuevamente.';
            }else{
                return window.location.reload();
            }

            
        }catch(erro){
            console.log(erro);
        }
    };
    //se valida que sea un token valido
    
    function cerrarModal(){
        const cerrar = document.getElementById('xCerrar');
        const inputAlerta = document.getElementById('inputAlerta');

        cerrar.classList.remove("activo");
        inputAlerta.classList.remove("activo");
    }

    function cerrarError() {
        const input = document.getElementById('labelError');
        const backgroundAlerts = document.getElementById('backgroundAlerts');
        
        backgroundAlerts.classList.add('none');
        input.classList.add('none');
    }

    //se ejecuta funcion de validar token
    return (
        <div className='margin-t-2 oh-flex'>
            <img className='logoDelInicio' src='/img/Logo-TecNM 1.png' alt='logo' />
            <div className='oh-flex oh-center field'>
                <form  className='formCustomers oh-flex oh-center' onSubmit={user}>
                    <div className='backgroundAlerts none' id='backgroundAlerts'></div>
                    <span className="oh-flex oh-center letAlerta none" id="labelError">
                        
                        <span className="width100" id="textoError"></span>
                        <span className="oh-flex oh-center btncerrar padding-1" id="xCerrar" onClick={cerrarError}>x</span>
                        <span className="oh-flex oh-center btnAcceptAlert padding-1" onClick={cerrarError}>Aceptar</span>
                    </span>
                    <img src="/img/Logo-TecNM 2.png" alt="letras" className='letrasLogin' />
                    <div className='contendorInputs'>
                        <div className='inputForm'>
                            <label className='labelForm oh-flex'>Usuario:</label>
                            <input 
                            value={email}
                            onChange={e=> setEmail(e.target.value)}
                            className='inputRound oh-flex' type="text" />
                        </div>
                        <div className='inputForm'>
                            <label className='labelForm oh-flex'>Contraseña:</label>
                            <input 
                            id='Password'
                            value={password}
                            onChange={ e=> setPassword(e.target.value)}
                            data-label='Contraseña'
                            className='inputRound oh-flex' type="password" />
                        </div>
                        <button className='btnForm' type='submit'>Entrar</button>
                    </div>
                    <span className='oh-flex oh-center letAlerta none' id='inputAlerta'>
                        <span className='width100' id='textoAlerta'></span>
                        <span className="oh-flex oh-center btncerrar" id="xCerrar" onClick={cerrarModal}>x</span>
                        <span className='oh-flex oh-center btnAcceptAlert' onClick={cerrarModal}>Aceptar</span>
                    </span>
                    
                </form>
            </div>
        </div>
    );
}

export default Log;