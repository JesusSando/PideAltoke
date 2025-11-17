import { Routes, Route } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './assets/css/carrito.css'
import '../src/assets/css/admin.css'
import '../src/assets/js/estadisticas'

import {Encabezado,Carrusel} from './components/encabezado';
import {Menu,PedirMenu} from './components/menu';
import {Oferta,TodasOfertas} from './components/oferta';
import {IniciarSesion} from './components/iniciarsesion';
import { OlvidadoContrasena } from './components/olvidadocontrasena';
import Nosotros from './components/nosotros';
import Pie      from './components/pie';
import Carrito  from './components/carrito';
import ComidaAdmin from './components/adminComida';
import Producto    from './components/produto';
import Blog from './components/blog';
import PaginaBlog  from './components/paginaBlog';
import AdminOferta from './components/adminOferta';
import AdminBlog from './components/adminBlog';
import AdminProducto from './components/adminProductos';
import AdminEstadisticas from './components/AdminEstadisticas';
import Registrarse from './components/registrarse';
import Pago   from './components/pago';
import Boleta from './components/boleta';
import Contacto    from './components/contacto';
import AdminCuenta from './components/adminCuentas';



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
      <Route path='carrito'  element={<><Carrito/> </>}/> 
      <Route path='pago'     element={<><Pago/> </>}/>
      <Route path='boleta'   element={<><Boleta/> </>}/>
      <Route path='iniciarsesion' element={<><IniciarSesion/> </>}/>
      <Route path='registrarse'   element={<Registrarse/>}/>
      <Route path='olvidadocontrasena' element={<OlvidadoContrasena/>}/>
      <Route path='pedirMenu' element={<><PedirMenu/> </>}/>
      <Route path='ofertas'   element={<><Oferta/><TodasOfertas/></>}/>
      <Route path='contacto'  element={<Contacto/>}/>
      <Route path='blog'      element={<><Blog/> </>}/>
      <Route path='/blog/:id' element={<><PaginaBlog/> </>}/>
      <Route path='/producto/:id' element={<Producto/>}/>


      <Route path='adminProducto' element={<><AdminProducto/> </>}/>
      <Route path='adminComida'   element={<><ComidaAdmin/> </>}/>
      <Route path='adminOferta'   element={<><AdminOferta/> </>}/>
      <Route path='adminBlog'     element={<><AdminBlog/> </>}/>
      <Route path='adminCuenta'   element={<><AdminCuenta/> </>}/>
      <Route path='adminEstadisticas' element={<><AdminEstadisticas/> </>}/>
      </Routes>
      
      <Pie/>
    </>
  )
}

export default App
