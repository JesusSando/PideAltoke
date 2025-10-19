import { Routes, Route } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/css/carrito.css';
import '../src/assets/css/admin.css';

import { Encabezado, Carrusel } from './components/encabezado';
import { Menu, PedirMenu } from './components/menu';
import Nosotros from './components/nosotros';
import Pie from './components/pie';
import Carrito from './components/carrito';
import { IniciarSesion } from './components/iniciarsesion';
import AdminProducto from './components/PanelAdmin';
import { Registrarse } from './components/registrarse';
import { OlvidadoContrasena } from './components/olvidadocontrasena';
import Pago from './components/pago';
import Boleta from './components/boleta';

function App() {
  return (
    <>
      <Encabezado/>
      <Routes>
        <Route path='/' element={
          <>
            <Carrusel/>
            <Menu/> 
            <Nosotros/>  
          </>
        }/>

        <Route path='nosotros' element={<Nosotros/>}/>
        <Route path='carrito' element={<Carrito/>}/>
        <Route path='pago' element={<Pago/>}/> 
        <Route path='boleta' element={<Boleta/>}/> 
        <Route path='iniciarsesion' element={<IniciarSesion/>}/>
        <Route path='pedirMenu' element={<PedirMenu/>}/>
        <Route path='admin' element={<AdminProducto/>}/>
        <Route path='registrarse' element={<Registrarse/>}/>
        <Route path='olvidadocontrasena' element={<OlvidadoContrasena/>}/>
      </Routes>
      <Pie/>
    </>
  );
}

export default App;
