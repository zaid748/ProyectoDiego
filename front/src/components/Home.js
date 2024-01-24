import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import axios from 'axios';
import { Link } from "react-router-dom";

const Home = () => {
  const [Buscar, setBuscar] = useState('');
  const [Empresa, setEmpresa] = useState([]);
  const [NombreEmpresa, setNombreEmpresa] = useState('')
  const BuscarEmpresa = async()=>{
    try {
      if(Buscar === ''){
        const empresas = (await axios.get(`${process.env.REACT_APP_HOST}/Empresas`)).data;
        setEmpresa(empresas);
      }else{
        const empresa = (await axios.get(`${process.env.REACT_APP_HOST}/Empresas`, {
          params:{
            busqueda: Buscar
          }
        })).data;
        if(empresa.length === 0){
          const empresas = (await axios.get(`${process.env.REACT_APP_HOST}/Empresas`)).data;
          setEmpresa(empresas);
          const label = document.getElementById('labelError');
          const backgroundAlerts = document.getElementById('backgroundAlerts');
          label.classList.remove('none');
          backgroundAlerts.classList.remove('none');
          const list = document.getElementById('textoError');
          list.innerHTML = `La empresa que buscas no se encuentra en el sistema.`;
        }else{
          setEmpresa(empresa);
        }
        
      }

    } catch (error) {
      console.log(error);
    }
  }
  const [selectedEmpresaId, setSelectedEmpresaId] = useState(null);
  function handleRowClick(userId) {
    if (selectedEmpresaId === userId) {
      setSelectedEmpresaId('');
    } else {
      setSelectedEmpresaId(userId);
    }
  }

  const Eliminar = async (id) => {
    try {
      // Construir la URL de eliminación utilizando la plantilla de cadena
      const urlEliminar = `${process.env.REACT_APP_HOST}/Empresas/${id}`;
      // Realizar la solicitud DELETE
      await axios.delete(urlEliminar);
      const input = document.getElementById('labelAlert');
      input.classList.add('none');
      const label = document.getElementById('labelError');
      label.classList.remove('none');
      const list = document.getElementById('textoError');
      list.innerHTML = `La empresa a sido eliminada.`;
      BuscarEmpresa();

    } catch (error) {
      console.log(error);
    }
  }

  const EditarEmpresa = async (id) => {
    try {
      if (id == null) {
        const label = document.getElementById('labelError');
        label.classList.remove('none');
      } else {
        return window.location.href = `#/Forms/Empresas/${id}`;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const Alerta = async (id) => {
    try {
      if (id == null) {
        const label = document.getElementById('labelError');
        label.classList.remove('none');
      } else {
        const urlGet = `${process.env.REACT_APP_HOST}/Empresas/${id}`;
        // Realizar la solicitud DELETE
        const response = (await axios.get(urlGet)).data;
        setNombreEmpresa(response.nombre);
        const input = document.getElementById('labelAlert');
        input.classList.remove('none');
      }
    } catch (error) {
      console.error(error);
    }
  };

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
  useEffect(()=>{
    BuscarEmpresa();
  }, []);

  function cerrarAlerta() {
    const input = document.getElementById('labelAlert');
    input.classList.add('none');
  }

  return (
    <div className='oh-flex oh-center'>
      <h1 className='txtBlueL' style={{ marginTop: '-6rem', fontSize: '4rem'}}>ITCJ</h1>
      <div className='oh-flex oh-center div95' style={{minHeight: '350px'}}>
        <div className='inputForm div50 relativo' style={{marginBottom: '5rem'}}>
            <input 
            id='Buscar'
            data-label='Buscar'
            value={Buscar} 
            onChange={ e=> setBuscar(e.target.value)}
            className='inputRound transparente oh-flex' type="text" style={{height: '40px'}}/>
            <button className='btnForm topBuscar' id='btnuser' onClick={BuscarEmpresa} style={{  margin: "2rem" }}>Buscar</button>
        </div>
        <div className='backgroundAlerts none' id='backgroundAlerts'></div>
        <span className="oh-flex oh-center letAlerta none" id="labelError">
          <img src='/img/advertence.svg' alt='alvertencia'></img>
          <span className="width100" id="textoError">Selecione una empresa</span>
          <span className="btncerrar padding-1 padding-1" id="xCerrar" onClick={cerrarError}>x</span>
          <span className="oh-flex oh-center btnAcceptAlert padding-1" onClick={aceptarError}>Aceptar</span>
        </span>
        <span className="oh-flex oh-center letAlerta none" id="labelAlert">
          <img src='/img/advertence.svg' alt='alvertencia'></img>
          <span className="width100" id="textoError">¿Seguro que desea borrar la empresa?</span><br />
          <span className="width100" id="textoError">{NombreEmpresa}</span>
          <span className="btncerrar padding-1 padding-1" id="xCerrar" onClick={cerrarAlerta}>x</span>

          <div className='oh-flex oh-center oh-50' style={{ justifyContent: 'space-around' }}>
            <span className="oh-flex oh-center btnBorrarAlert padding-1" onClick={Eliminar.bind(null, selectedEmpresaId)}>Borrar</span>
            <span className="oh-flex oh-center btnCancelarAlert padding-1" onClick={cerrarAlerta.bind(null, setSelectedEmpresaId)}>Cancelar</span>
          </div>

        </span>
        <span className="oh-flex oh-center letAlerta none" id="labelError">
          <img src='/img/advertence.svg' alt='alerta'></img>
          <span className="width100" id="textoError">Producto Guardado</span>
          <span className="oh-flex oh-center btncerrar padding-1" id="xCerrar" onClick={cerrarError}>x</span>
          <span className="oh-flex oh-center btnAcceptAlert padding-1" onClick={aceptarError}>Aceptar</span>
        </span>
        <table className=" divTables">
            <thead>
            <tr>
              <th style={{ padding: "0px"}}>
                <div className='editEliminardiv'>
                    <Link className='plus' to={'/Form/Agregar'}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <path d="M17.143 4.6875C17.143 3.65039 16.1854 2.8125 15.0001 2.8125C13.8148 2.8125 12.8572 3.65039 12.8572 4.6875V13.125H3.21439C2.02912 13.125 1.07153 13.9629 1.07153 15C1.07153 16.0371 2.02912 16.875 3.21439 16.875H12.8572V25.3125C12.8572 26.3496 13.8148 27.1875 15.0001 27.1875C16.1854 27.1875 17.143 26.3496 17.143 25.3125V16.875H26.7858C27.9711 16.875 28.9287 16.0371 28.9287 15C28.9287 13.9629 27.9711 13.125 26.7858 13.125H17.143V4.6875Z" fill="#000" />
                  </svg></Link>
                  <svg style={{ cursor: 'pointer' }} onClick={EditarEmpresa.bind(null, selectedEmpresaId)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <path d="M10.5 15C12.0913 15 13.6174 14.2098 14.7426 12.8033C15.8679 11.3968 16.5 9.48912 16.5 7.5C16.5 5.51088 15.8679 3.60322 14.7426 2.1967C13.6174 0.790176 12.0913 0 10.5 0C8.9087 0 7.38258 0.790176 6.25736 2.1967C5.13214 3.60322 4.5 5.51088 4.5 7.5C4.5 9.48912 5.13214 11.3968 6.25736 12.8033C7.38258 14.2098 8.9087 15 10.5 15ZM8.35781 17.8125C3.74063 17.8125 0 22.4883 0 28.2598C0 29.2207 0.623438 30 1.39219 30H15.1312C14.9859 29.4844 14.9578 28.9219 15.0656 28.3711L15.7687 24.8496C15.9 24.1875 16.1719 23.5898 16.5563 23.1094L18.4453 20.748C16.9406 18.9316 14.8969 17.8125 12.6375 17.8125H8.35781ZM28.7719 13.8105C28.0406 12.8965 26.8547 12.8965 26.1188 13.8105L24.7406 15.5332L28.0687 19.6934L29.4469 17.9707C30.1781 17.0566 30.1781 15.5742 29.4469 14.6543L28.7719 13.8105ZM17.6203 24.4336C17.4281 24.6738 17.2922 24.9727 17.2266 25.3066L16.5234 28.8281C16.4578 29.1504 16.5328 29.4844 16.7203 29.7188C16.9078 29.9531 17.175 30.0469 17.4328 29.9648L20.25 29.0859C20.5125 29.0039 20.7563 28.834 20.9484 28.5938L27.0047 21.0176L23.6766 16.8574L17.6203 24.4336Z" fill="#33333B" />
                  </svg>
                  
                  <img src="/img/borrar.png" alt="basura" onClick={Alerta.bind(null, selectedEmpresaId)} width="30" height="35" style={{cursor:'pointer'}} />

                </div>
              </th>
            </tr>
              <tr className="theadborder">
                <th
                  style={{
                    width: "170px",
                    maxWidth: "170px",
                    minWidth: "170px",
                    border: "2px solid #99AAB5 ",
                  }}
                  className="thTables border-bottomtable txtUbuntu"
                >
                  Empresa
                </th>
                <th
                  style={{ width: "120px", maxWidth: "120px", minWidth: "120px" }}
                  className="thTables border-middletable border-bottomtable txtUbuntu"
                >
                  Ubicación
                </th>
                <th
                  style={{ width: "175px", maxWidth: "175px", minWidth: "175px" }}
                  className="thTables border-middletable border-bottomtable txtUbuntu"
                >
                  Teléfono
                </th>
                <th
                  style={{ width: "205px", maxWidth: "205px", minWidth: "205px" }}
                  className="thTables border-middletable border-bottomtable txtUbuntu"
                >
                  Extensiones
                </th>
                
                <th
                  style={{ width: "295px", maxWidth: "295px", minWidth: "205px" }}
                  className="thTables border-middletable border-bottomtable txtUbuntu"
                >
                  Correo
                </th>
              </tr>
            </thead>
            <tbody>
              {Empresa.map((index, e) => (
                <tr
                  key={index._id}
                  className={selectedEmpresaId === index._id ? 'selected-row ' : ' '}
                  onClick={() => handleRowClick(index._id)}
                >
                  <td
                    style={{
                      width: "170px",
                      maxWidth: "170px",
                      minWidth: "170px",
                    }}
                    className={
                      e !== Empresa.length - 1
                        ? "tdTables border-bottomtable "
                        : "tdTables"
                    }
                  >
                    <strong>
                      {index.nombre}
                    </strong>
                  </td>
                  <td
                    style={{
                      width: "120px",
                      maxWidth: "120px",
                      minWidth: "120px",
                    }}
                    className={
                      e !== Empresa.length - 1
                        ? "tdTables border-middletable border-bottomtable "
                        : "tdTables border-middletable "
                    }
                  >
                    <strong>{index.Ubicacion}</strong>
                  </td>
                  <td
                    style={{
                      width: "180px",
                      maxWidth: "180px",
                      minWidth: "180px",
                    }}
                    className={
                      e !== Empresa.length
                        ? "tdTables border-middletable border-bottomtable "
                        : "tdTables border-middletable "
                    }
                  >
                    <strong>
                      {index.Telefono}
                    </strong>
                  </td>
                  <td
                    style={{
                      width: "150px",
                      maxWidth: "150px",
                      minWidth: "150px",
                    }}
                    className={
                      e !== Empresa.length
                        ? "tdTables border-middletable border-bottomtable "
                        : "tdTables border-middletable "
                    }
                  >
                    <strong>{index.Extensiones}</strong>
                  </td>
                  <td
                    style={{
                      width: "150px",
                      maxWidth: "150px",
                      minWidth: "150px",
                    }}
                    className={
                      e !== Empresa.length
                        ? "tdTables border-middletable border-bottomtable "
                        : "tdTables"
                    }
                  >
                    <strong>{index.Correo}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Home;