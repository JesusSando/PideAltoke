import { useState } from 'react'

import { Routes, Route, Router } from 'react-router-dom';
 
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
import {IniciarSesion} from './components/iniciarsesion';
import ComidaAdmin from './components/adminComida';
 
import Producto from './components/produto';

import Oferta from './components/oferta';

function App() {
 

  return (
    <>

      <Encabezado/>
      <Routes>
        <Route path='/' element={<> 
        <Carrusel/>
           
        <Menu/> 
        <Oferta/>
        <Nosotros/>  
 
        </>
      }/>

      <Route path='nosotros' element={<><Nosotros/> </>}/>
      <Route path='carrito' element={<><Carrito/> </>}/>
      <Route path='iniciarsesion' element={<><IniciarSesion/> </>}/>
      <Route path='pedirMenu' element={<><PedirMenu/> </>}/>
      <Route path='/producto/:id' element={<Producto/>}/>
      <Route path='Admin' element={<><ComidaAdmin/> </>}/>
           
      </Routes>
      
      <Pie/>

    </>
  )
}

export default App
