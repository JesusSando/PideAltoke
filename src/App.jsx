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
import Blog from './components/blog';
import PaginaBlog from './components/paginaBlog';
import {Oferta,TodasOfertas} from './components/oferta';
import  AdminOferta  from './components/adminOferta';
import AdminBlog from './components/adminBlog';
 
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
      <Route path='ofertas' element={<><Oferta/><TodasOfertas/></>}/>
      <Route path='blog' element={<><Blog/> </>}/>
      <Route path='/blog/:id' element={<><PaginaBlog/> </>}/>
      <Route path='/producto/:id' element={<Producto/>}/>
      <Route path='adminComida' element={<><ComidaAdmin/> </>}/>
      <Route path='oferta' element={<><AdminOferta/> </>}/>
      <Route path='adminBlog' element={<><AdminBlog/> </>}/>

        
           
      </Routes>
      
      <Pie/>

    </>
  )
}

export default App
