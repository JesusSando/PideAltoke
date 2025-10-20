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
import AdminProducto from './components/adminProductos';

import { Registrarse } from './components/registrarse';
import { OlvidadoContrasena } from './components/olvidadocontrasena';     
import Pago from './components/pago'; 
import Boleta from './components/boleta';
import Contacto from './components/contacto';
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
      <Route path='pago' element={<><Pago/> </>}/>
      <Route path='boleta' element={<><Boleta/> </>}/>
      <Route path='iniciarsesion' element={<><IniciarSesion/> </>}/>
      <Route path='registrarse' element={<Registrarse/>}/>
      <Route path='olvidadocontrasena' element={<OlvidadoContrasena/>}/>
      <Route path='pedirMenu' element={<><PedirMenu/> </>}/>
      <Route path='ofertas' element={<><Oferta/><TodasOfertas/></>}/>

      <Route path='contacto' element={<Contacto/>}/>
      <Route path='blog' element={<><Blog/> </>}/>
      <Route path='/blog/:id' element={<><PaginaBlog/> </>}/>
      <Route path='/producto/:id' element={<Producto/>}/>
      <Route path='producto' element={<><AdminProducto/> </>}/>
      <Route path='adminComida' element={<><ComidaAdmin/> </>}/>
      <Route path='oferta' element={<><AdminOferta/> </>}/>
      <Route path='adminBlog' element={<><AdminBlog/> </>}/>

        
           
      </Routes>
      
      <Pie/>

    </>
  )
}

export default App
