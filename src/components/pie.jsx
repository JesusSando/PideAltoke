import React from "react";
import "font-awesome/css/font-awesome.min.css";

function Pie() {
  const year = new Date().getFullYear();

  return (
    <footer className="seccion_pie py-4 text-light" style={{ backgroundColor: "#222" }}>
      <div className="container">
        <div className="row text-center text-md-start">
          {/*Contacto */}
          <div className="col-md-4 mb-4">
            <h4 className="mb-3">Contacto</h4>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a
                  href="https://www.google.com/maps/place/Antonio+Varas+666,+7500961+Providencia,+Regi%C3%B3n+Metropolitana/@-33.4330998,-70.620379,17z/data=!3m1!4b1!4m6!3m5!1s0x9662cf7b9566d44f:0x5c1618bbd02ec418!8m2!3d-33.4331044!4d-70.6155081!16s%2Fg%2F11knl98xg4?entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light text-decoration-none d-flex align-items-center"
                >
                  <i className="fa fa-map-marker fa-lg me-2 text-warning" aria-hidden="true"></i>
                  <span>Antonio Varas 666, Santiago</span>
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="tel:+569123456789"
                  className="text-light text-decoration-none d-flex align-items-center"
                >
                  <i className="fa fa-phone fa-lg me-2 text-success" aria-hidden="true"></i>
                  <span>+56 9 1234 56789</span>
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="mailto:duoc@duocuc.cl"
                  className="text-light text-decoration-none d-flex align-items-center"
                >
                  <i className="fa fa-envelope fa-lg me-2 text-danger" aria-hidden="true"></i>
                  <span>duoc@duocuc.cl</span>
                </a>
              </li>
            </ul>
          </div>

          {/*Redes sociales */}
          <div className="col-md-4 mb-4 text-center">
            <h4 className="mb-3">Síguenos</h4>
            <div className="d-flex justify-content-center gap-3">
              <a href="#" className="text-light fs-4">
                <i className="fa fa-facebook-official" aria-hidden="true"></i>
              </a>
              <a href="#" className="text-light fs-4">
                <i className="fa fa-twitter" aria-hidden="true"></i>
              </a>
              <a href="#" className="text-light fs-4">
                <i className="fa fa-linkedin-square" aria-hidden="true"></i>
              </a>
              <a href="#" className="text-light fs-4">
                <i className="fa fa-instagram" aria-hidden="true"></i>
              </a>
              
            </div>
          </div>

          {/*  Horario */}
          <div className="col-md-4 mb-4 text-md-end">
            <h4 className="mb-3">Horarios de Atención</h4>
            <p className="mb-1">Todos los días</p>
            <p className="mb-0">10:00 AM - 10:00 PM</p>
          </div>
        </div>

        <hr className="border-light" />

        {/* Pie inferior */}
        <div className="text-center small">
          <p className="mb-0">
            © {year} Todos los derechos reservados — <strong>PideAltok</strong>  
            <br />
            Desarrollado por <a href="https://www.duoc.cl/" className="text-warning text-decoration-none">DuocUc FullStack2</a>
          </p>
        </div>
      </div>

      {/* Estilos adicionales inline */}
      <style>{`
        .seccion_pie a:hover i {
          transform: scale(1.2);
          transition: 0.2s ease-in-out;
          color: #ff0707ff !important;
        }
        .seccion_pie i {
          transition: 0.2s ease;
        }
      `}</style>
    </footer>
  );
}

export default Pie;