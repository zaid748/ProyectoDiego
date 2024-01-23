import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import axios from 'axios';

const Home = () => {
  const [Buscar, setBuscar] = useState('');
  const [Empresa, setEmpresa] = useState([]);

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
  }, [])

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
          <img src='/img/advertence.svg' alt='alerta'></img>
          <span className="width100" id="textoError">Producto Guardado</span>
          <span className="oh-flex oh-center btncerrar padding-1" id="xCerrar" onClick={cerrarError}>x</span>
          <span className="oh-flex oh-center btnAcceptAlert padding-1" onClick={aceptarError}>Aceptar</span>
        </span>
        <table className=" divTables">
            <thead>
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