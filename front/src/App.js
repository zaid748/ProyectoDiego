import './App.css';
import { HashRouter, Navigate, Route, Routes, } from 'react-router-dom';
import { useState, useEffect } from 'react';

import NavbarComp from './components/NavbarComp';
import Log from './components/Log';
import Register from './components/Forms/Register';

import Users from './components/Tables/Users';
import User from './components/Forms/User';

import { ProtectedRoute } from './components/ProtectedRoute';
import axios from 'axios';
import NavbarAdmin from './components/NavbarAdmin';

import Home from './components/Home';

import Empresa from './components/Forms/Empresa';
import EmpresaActualizacion from './components/Forms/EmpresaActualizacion';

function App() {

  const url = `${process.env.REACT_APP_HOST}/User/leerToken`;
  const [autho, setAutho] = useState(null);

  const getAutho = async ()=>{
    const res = await axios.get(url, {withCredentials: true});
    if(res.data === 'Acceso Denegado. No hay Token'){
      setAutho(null);
    }else if(res.data === 'El token no es valido'){
      setAutho(null);
    }else{
      setAutho(res.data);
    }

  };

  useEffect(()=>{
    getAutho();
  }, []);

  return (
    <div className="App">
      <HashRouter className="App-menu">
        <div>
          <Routes>
          <Route element={<ProtectedRoute user={autho} redirectTo={'/Home'}  isAllowed={!autho}/>}>  
              <Route path='/' element={ <NavbarComp/> }>
                <Route path='*' element={ <Navigate replace to='/'/> } />
                <Route path='Log' element={<Log/>} />
                <Route path='/' element={<Log/>} /> 
              </Route>
            </Route>

            <Route element={<ProtectedRoute user={autho} isAllowed={(!!autho)} />}> 
              <Route path='/' element={ <NavbarAdmin /> } > 
                <Route path='*' element={ <Navigate replace to='/'/> } />
                <Route path='/Home' element={<Home/>} />
                <Route path='/Tables/Users' element={<Users/>} />
                <Route path='/Forms/Register' element={<Register/>} />
                <Route path='/Form/Agregar' element={<Empresa/>} />
                <Route path='/Forms/User/:id' element={<User/>}/>
                <Route path='/Forms/Empresas/:id' element={<EmpresaActualizacion/>}/>
              </Route>
            </Route>
          </Routes>
          
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
