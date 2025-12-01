




import carrusel1 from '../assets/images/carrusel1.jpg'
import carrusel2 from '../assets/images/carrusel2.jpg'
import carrusel3 from '../assets/images/carrusel3.jpg'




import { obtenerUsuario, cerrarSesion } from '../assets/js/cargo';
import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

export function Encabezado() {

  const [usuario, setUsuario] = useState(null);
  useEffect(() => {
    const actualizarUsuario = () => {
      ;
      const usr = obtenerUsuario();
      setUsuario(usr);
    };
    actualizarUsuario();

    window.addEventListener('usuarioCargado', actualizarUsuario);
    return () => {
      window.removeEventListener('usuarioCargado', actualizarUsuario);
    };
  }, []);

  const cerrarSesionHandler = () => {
        cerrarSesion();
        setUsuario(null);
        navigate('/');
    }
 
    const esAdminOEmpleado = usuario && 
                             (usuario.rol?.nombre === 'ADMIN' || usuario.rol?.nombre === 'EMPLEADO');

  


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid d-flex justify-content-between">
          <Link className="navbar-brand" to="/">Pide Altoke</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarColor01">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item ">
                <Link to='/' className="nav-link">Principal</Link>

              </li>
              <li className="nav-item">
                <Link to='/nosotros' className="nav-link">Acerca</Link>
              </li>
              <li className="nav-item">
                <Link to='/pedirMenu' className="nav-link">Menu</Link>
              </li>
              <li className="nav-item">
                <Link to='/ofertas' className="nav-link">Ofertas</Link>
              </li>
              <li className="nav-item">
                <Link to='/carrito' className="nav-link">Carrito</Link>
              </li>
              <li className="nav-item">
                <Link to='/blog' className="nav-link">Blog</Link>
              </li>
              <li className="nav-item">
                <Link to='/contacto' className="nav-link">Contacto</Link>
              </li>
              
              {!usuario && (
                <li className="nav-item">
                  <Link to='/iniciarsesion' className="nav-link">Cuenta</Link>
                </li>
              )}
              {esAdminOEmpleado && (


                <div className="boton_baja">
                  <input type="checkbox" id="dropdown-toggle" className="boton_baja_listo" />
                  <label htmlFor="dropdown-toggle" className="boton_baja_boton">Admin</label>
                  <div className="boton_baja_contenido">
                    <Link to='/adminProducto' className="nav-link link_opciones"> Productos</Link>
                    <Link to='/adminComida' className="nav-link link_opciones"> Comida</Link> 
                    <Link to='/adminBlog' className="nav-link link_opciones"> Blog</Link>
                    <Link to='/adminEstadisticas' className="nav-link link_opciones"> Estadisticas</Link>
                    <Link to='/adminCuenta' className="nav-link link_opciones"> Cuenta</Link>
                  </div>
                </div>
              )}

              {usuario && (
                <li className="nav-item">

                  <Link to='/' onClick={cerrarSesionHandler} className="nav-link">Salir</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}


export function Carrusel() {
  return (

    <div className="position-relative">

      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src={carrusel1} alt="First slide" />
            <div className="contenedor_eslogan  position-absolute top-50 start-50 translate-middle text-center text-white">
              <div className="pri_terxto  ">
                <div className="seg_texto">
                  <span>A tu ritmo</span>
                </div>
                <h3>Pide <br />
                  Pizza</h3>
                <h4>Y Disfruta</h4>
              </div>
              <a href="#menu" className='scroll-down-arrow position-absolute bottom-0 start-50 traslate-middle-x mb-4 text-white'>
                <svg xmlns="http://www.w3.org/2000/svg" width="46" height="82" fill="#ff0000ff" className="bi bi-chevron-double-down" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                  <path fillRule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                </svg>
              </a>
            </div>
          </div>


          <div className="carousel-item">
            <img className="d-block w-100" src={carrusel2} alt="Second slide" />
            <div className="contenedor_eslogan  position-absolute top-50 start-50 translate-middle text-center text-white">
              <div className="pri_terxto  ">
                <div className="seg_texto">
                  <span>A tu ritmo</span>
                </div>
                <h3>Pide <br />
                  Hamburguesa</h3>
                <h4>Y Disfruta</h4>
              </div>
              <a href="#menu" className='scroll-down-arrow position-absolute bottom-0 start-50 traslate-middle-x mb-4 text-white'>
                <svg xmlns="http://www.w3.org/2000/svg" width="46" height="82" fill="#ff0000ff" className="bi bi-chevron-double-down" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                  <path fillRule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src={carrusel3} alt="Third slide" />
            <div className="contenedor_eslogan  position-absolute top-50 start-50 translate-middle text-center text-white">
              <div className="pri_terxto  ">
                <div className="seg_texto">
                  <span>A tu ritmo</span>
                </div>
                <h3>Pide <br />
                  Pastas</h3>
                <h4>Y Disfruta</h4>
              </div>
              <a href="#menu" className='scroll-down-arrow position-absolute bottom-0 start-50 traslate-middle-x mb-4 text-white'>
                <svg xmlns="http://www.w3.org/2000/svg" width="46" height="82" fill="#ff0000ff" className="bi bi-chevron-double-down" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                  <path fillRule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                </svg>
              </a>
            </div>
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
      </div>
    </div>
  );
}

