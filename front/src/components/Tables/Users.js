import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const Users = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_HOST}/User/getUsers`);
      const data = response.data;
      setUsuarios(data);
    } catch (error) {
      console.error(error);
    }
  }

  function cerrar() {
    const input = document.getElementById('labelGuardado');
    input.classList.add('none');
    return window.location.reload();
  }

  function aceptar() {
    const input = document.getElementById('labelGuardado');
    input.classList.add('none');
    return window.location.reload();
  }

  function handleRowClick(userId) {
    if (selectedUserId === userId) {
      setSelectedUserId('');
    } else {
      setSelectedUserId(userId);
    }
  }
  const Eliminar = async (id) => {
    try {
      // Construir la URL de eliminación utilizando la plantilla de cadena
      const urlEliminar = `${process.env.REACT_APP_HOST}/User/${id}`;
      // Realizar la solicitud DELETE
      const response = await axios.delete(urlEliminar);
      const input = document.getElementById('labelAlert');
      input.classList.add('none');
      const label = document.getElementById('labelError');
      label.classList.remove('none');
      const list = document.getElementById('textoError');
      list.innerHTML = `El usuario a sido eliminado.`;
      getData();

    } catch (error) {
      console.log(error);
    }
  }
  const [NombreUsuario, setNombreUsuario] = useState('');
  const Alerta = async (id) => {
    try {
      if (id == null) {
        const label = document.getElementById('labelError');
        label.classList.remove('none');
      } else {
        const urlGet = `${process.env.REACT_APP_HOST}/User/${id}`;
        // Realizar la solicitud DELETE
        const response = (await axios.get(urlGet)).data;
        setNombreUsuario(response.nombre + ' ' + response.apellido);
        const input = document.getElementById('labelAlert');
        input.classList.remove('none');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const EditarUsuario = async (id) => {
    try {
      if (id == null) {
        const label = document.getElementById('labelError');
        label.classList.remove('none');
      } else {
        return window.location.href = `#/Forms/User/${id}`;
      }
    } catch (error) {
      console.error(error);
    }
  };

  function cerrarError() {
    const input = document.getElementById('labelError');
    input.classList.add('none');
  }

  function aceptarError() {
    const input = document.getElementById('labelError');
    input.classList.add('none');
  }

  function cerrarAlerta() {
    const input = document.getElementById('labelAlert');
    input.classList.add('none');
  }

  const goBack = () => {
    // Puedes utilizar el objeto history para volver a la página anterior
    window.history.back();
  };

  const ToolTip = ({ text, children }) => {
    const [showToolTip, setShowToolTip] = useState(false);
  
    return (
      <div
        onMouseEnter={() => setShowToolTip(true)}
        onMouseLeave={() => setShowToolTip(false)}
        style={{ position: 'relative', display: 'inline-block' }}
      >
        {children}
        {showToolTip && (
          <div
            style={{
              position: 'absolute',
              bottom: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              whiteSpace: 'nowrap',
              backgroundColor: '#fff',
              color: '#333',
              padding: '0.5rem',
              border: 'solid 3px #99AAB5',
              borderRadius: '22px',
              zIndex: 1,
              fontSize: '12px',
            }}
          >
            {text}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className='oh-flex oh-center'>
      <span className="oh-flex oh-center letAlerta none" id="labelGuardado">
        <span className="width100" id="textoAlerta">Se ha actualizado la información</span>
        <span className="btncerrar padding-1" id="xCerrar" onClick={cerrar}>x</span>
        <span className="oh-flex oh-center btnAcceptAlert" onClick={aceptar}>Aceptar</span>
      </span>
      <h1 className='txtBlueL txtBatangas'>Usuarios</h1>
      <div className='oh-flex oh-center div95 '>
        <span className="oh-flex oh-center letAlerta none" id="labelError">
          <img src='/iconos/advertence.svg'></img>
          <span className="width100" id="textoError">Selecione un usuario</span>
          <span className="btncerrar padding-1 padding-1" id="xCerrar" onClick={cerrarError}>x</span>
          <span className="oh-flex oh-center btnAcceptAlert padding-1" onClick={aceptarError}>Aceptar</span>
        </span>
        <span className="oh-flex oh-center letAlerta none" id="labelAlert">
          <img src='/iconos/advertence.svg'></img>
          <span className="width100" id="textoError">¿Seguro que desea borrar al usuario?</span><br />
          <span className="width100" id="textoError">{NombreUsuario}</span>
          <span className="btncerrar padding-1 padding-1" id="xCerrar" onClick={cerrarAlerta}>x</span>

          <div className='oh-flex oh-center oh-50' style={{ justifyContent: 'space-around' }}>
            <span className="oh-flex oh-center btnBorrarAlert padding-1" onClick={Eliminar.bind(null, selectedUserId)}>Borrar</span>
            <span className="oh-flex oh-center btnCancelarAlert padding-1" onClick={cerrarAlerta.bind(null, selectedUserId)}>Cancelar</span>
          </div>

        </span>
        <div className="div75 justifyend">

        </div>

        <div className='oh-flex oh-right div95'></div>
        <table className='divTables' style={{ borderRadius: '0px 0px 0px 0px' }}>
          <thead>
            <tr>
              <th style={{ padding: "0px"}}>
                <div className='editEliminardiv'>
                <ToolTip text="Regresar"><svg xmlns="http://www.w3.org/2000/svg" onClick={goBack} style={{ cursor: 'pointer' }} width="30" height="30" viewBox="0 0 210 214" fill="none">
                          <g clip-path="url(#clip0_485_2)">
                          <path d="M210 107C210 78.6218 198.938 51.406 179.246 31.3396C159.555 11.2732 132.848 0 105 0C77.1523 0 50.4451 11.2732 30.7538 31.3396C11.0625 51.406 0 78.6218 0 107C0 135.378 11.0625 162.594 30.7538 182.66C50.4451 202.727 77.1523 214 105 214C132.848 214 159.555 202.727 179.246 182.66C198.938 162.594 210 135.378 210 107ZM94.7461 53.082C98.6016 49.1531 104.836 49.1531 108.65 53.082C112.465 57.0109 112.506 63.3641 108.65 67.2512L79.5293 96.9269L154.219 96.9688C159.674 96.9688 164.062 101.441 164.062 107C164.062 112.559 159.674 117.031 154.219 117.031H79.5293L108.65 146.707C112.506 150.636 112.506 156.989 108.65 160.876C104.795 164.763 98.5605 164.805 94.7461 160.876L48.8086 114.105C44.9531 110.177 44.9531 103.823 48.8086 99.9363L94.7461 53.082Z" fill="#99AAB5"/>
                          </g>
                          <defs>
                          <clipPath id="clip0_485_2">
                          <rect width="210" height="214" fill="white"/>
                          </clipPath>
                          </defs>
                  </svg></ToolTip>

                  <ToolTip text="Añadir usuario"><Link className='plus' to={'/Forms/Register'}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <path d="M17.143 4.6875C17.143 3.65039 16.1854 2.8125 15.0001 2.8125C13.8148 2.8125 12.8572 3.65039 12.8572 4.6875V13.125H3.21439C2.02912 13.125 1.07153 13.9629 1.07153 15C1.07153 16.0371 2.02912 16.875 3.21439 16.875H12.8572V25.3125C12.8572 26.3496 13.8148 27.1875 15.0001 27.1875C16.1854 27.1875 17.143 26.3496 17.143 25.3125V16.875H26.7858C27.9711 16.875 28.9287 16.0371 28.9287 15C28.9287 13.9629 27.9711 13.125 26.7858 13.125H17.143V4.6875Z" fill="#000" />
                  </svg></Link></ToolTip>
                  <ToolTip text="Editar usuario"><svg style={{ cursor: 'pointer' }} onClick={EditarUsuario.bind(null, selectedUserId)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <path d="M10.5 15C12.0913 15 13.6174 14.2098 14.7426 12.8033C15.8679 11.3968 16.5 9.48912 16.5 7.5C16.5 5.51088 15.8679 3.60322 14.7426 2.1967C13.6174 0.790176 12.0913 0 10.5 0C8.9087 0 7.38258 0.790176 6.25736 2.1967C5.13214 3.60322 4.5 5.51088 4.5 7.5C4.5 9.48912 5.13214 11.3968 6.25736 12.8033C7.38258 14.2098 8.9087 15 10.5 15ZM8.35781 17.8125C3.74063 17.8125 0 22.4883 0 28.2598C0 29.2207 0.623438 30 1.39219 30H15.1312C14.9859 29.4844 14.9578 28.9219 15.0656 28.3711L15.7687 24.8496C15.9 24.1875 16.1719 23.5898 16.5563 23.1094L18.4453 20.748C16.9406 18.9316 14.8969 17.8125 12.6375 17.8125H8.35781ZM28.7719 13.8105C28.0406 12.8965 26.8547 12.8965 26.1188 13.8105L24.7406 15.5332L28.0687 19.6934L29.4469 17.9707C30.1781 17.0566 30.1781 15.5742 29.4469 14.6543L28.7719 13.8105ZM17.6203 24.4336C17.4281 24.6738 17.2922 24.9727 17.2266 25.3066L16.5234 28.8281C16.4578 29.1504 16.5328 29.4844 16.7203 29.7188C16.9078 29.9531 17.175 30.0469 17.4328 29.9648L20.25 29.0859C20.5125 29.0039 20.7563 28.834 20.9484 28.5938L27.0047 21.0176L23.6766 16.8574L17.6203 24.4336Z" fill="#33333B" />
                  </svg></ToolTip>
                  
                  
                  <ToolTip text="Borrar usuario"><img src="/img/borrar.png" alt="basura" onClick={Alerta.bind(null, selectedUserId)} width="30" height="35" style={{cursor:'pointer'}} /></ToolTip>

                </div>
              </th>
            </tr>
            <tr className='theadborder'>
              <th className='thTables border-bottomtable txtUbuntu' style={{ border: "2px solid #99AAB5 " }}>Usuario</th>
              <th className='thTables border-middletable border-bottomtable txtUbuntu' style={{ border: "2px solid #99AAB5 " }}>Contraseña</th>
              {/* <th className='thTables border-bottomtable txtUbuntu' style={{ border: "2px solid #99AAB5 " }}>Modulos y Permisos</th> */}
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario, index) => (
              <tr
                key={usuario._id}
                className={selectedUserId === usuario._id ? 'selected-row ' : ' '}
                onClick={() => handleRowClick(usuario._id)}
              >
                <td className={(index !== usuarios.length - 1 ? 'tdTables border-bottomtable ' : 'tdTables')}>
                  <strong>{usuario.email}</strong>
                </td>
                <td className={(index !== usuarios.length - 1 ? 'tdTables border-middletable border-bottomtable ' : 'tdTables border-middletable ')}>
                  <strong>***************</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;