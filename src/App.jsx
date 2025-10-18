import { useState } from 'react'

import { Routes, Route } from 'react-router-dom';
 
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './assets/css/carrito.css'
import '../src/assets/css/admin.css'

import {Encabezado,Carrusel} from './components/encabezado';

 
import {Menu,PedirMenu} from './components/menu';
import Nosotros from './components/nosotros';
import Pie from './components/pie';
import Carrito from './components/carrito'
import IniciarSesion from './components/iniciarsesion';
import AdminProducto from './components/PanelAdmin';
 

function App() {
 

  return (
    <>

      <Encabezado/>
      <Routes>
        <Route path='/' element={<> 
        <Carrusel/>
 
        <Menu/> 
        <Nosotros/>  
   
        </>
      }/>

      <Route path='nosotros' element={<><Nosotros/> </>}/>
      <Route path='carrito' element={<><Carrito/> </>}/>
      <Route path='iniciarsesion' element={<><IniciarSesion/> </>}/>
      <Route path='pedirMenu' element={<><PedirMenu/> </>}/>
      <Route path='Admin' element={<><AdminProducto/> </>}/>
           
      </Routes>
      
      <Pie/>

    </>
  )
}

export default App
