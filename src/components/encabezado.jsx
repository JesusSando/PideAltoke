 

 
 

import carrusel1 from '../assets/images/carrusel1.jpg'
import carrusel2 from '../assets/images/carrusel2.jpg'
import carrusel3 from '../assets/images/carrusel3.jpg'




import { obtenerUsuario, cerrarSesion } from '../assets/js/cargo';
import React, { useEffect,useState } from 'react'; 
import { Link } from 'react-router-dom';
 
export function Encabezado() {

  const [usuario,setUsuario]=useState(null);
  useEffect(()=>{
    const actualizarUsuario=()=>{;
    const usr=obtenerUsuario();
    setUsuario(usr);
  };
  actualizarUsuario();

  window.addEventListener('usuarioCargado',actualizarUsuario);
  return()=>{
      window.removeEventListener('usuarioCargado',actualizarUsuario);
  };
  },[]);

  const cerrarSesionHandler=()=>{
    cerrarSesion();
    setUsuario(null);
  }


  return (
    <> 
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid d-flex justify-content-between"> 
        <a className="navbar-brand" href="#">Pide Altok</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarColor01">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item ">
              <Link to='/'><a className="nav-link" href="#">Principal</a></Link>
               
            </li>
            <li className="nav-item">
              <Link to='/nosotros'><a className="nav-link" href="#">Acerca</a></Link>
            </li>
            <li className="nav-item">
              <Link to='/pedirMenu'><a className="nav-link" href="#">Menu</a></Link>
            </li>
            <li className="nav-item">
              <Link to='/carrito'><a className="nav-link" href="#">Carrito</a></Link>
            </li>
            {!usuario &&(
            <li className="nav-item">
              <Link to='/iniciarsesion'><a className="nav-link" href="#">Iniciar sesión</a></Link>
            </li>
            )}
            {usuario &&(usuario.cargo==='admin' || usuario.cargo==='empleado') &&(
            <li className="nav-item">
              <Link to='/Admin'><a className="nav-link" href="#">Admin</a></Link>
            </li>
             )}
            
          </ul>
        
        </div>
        </div>
      </nav>

 
     
 </>
    );
}


export function Carrusel(){
  return(
 
<div className="position-relative">
 
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src={carrusel1} alt="First slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src={carrusel2} alt="Second slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src={carrusel3} alt="Third slide" />
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
           
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
 
        </a>
        
      <div className="carrusel_texto">
        <div className="titulo_carrusel">
          <span>Pide Altoke</span>
        </div>
        <h3>La <br />
          Mejor</h3>
        <h3 className='comida_txt'>COMIDA</h3>
      </div>
     

      </div>

       
    </div>

 

     
 

 


  );
}

 