import React from 'react'; 


 

import carrusel1 from '../assets/images/carrusel1.jpg'
import carrusel2 from '../assets/images/carrusel2.jpg'
import carrusel3 from '../assets/images/carrusel3.jpg'


import { Link } from 'react-router-dom';
 
export function Encabezado() {
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
            <li className="nav-item">
              <Link to='/iniciarsesion'><a className="nav-link" href="#">Cuenta</a></Link>
            </li>
            <li className="nav-item">
              <Link to='/Admin'><a className="nav-link" href="#">Admin</a></Link>
            </li>
             
            
          </ul>
        
        </div>
        </div>
      </nav>

 
     
 </>
    );
}


export function Carrusel(){
  return(
 
   <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={carrusel1} className="d-block w-100" alt="..." />
    </div>
    <div className="carousel-item">
      <img src={carrusel2} className="d-block w-100" alt="..." />
    </div>
    <div className="carousel-item">
      <img src={carrusel3} className="d-block w-100" alt="..." />
    </div>
  </div>
</div>


     
 

 


  );
}

 