import React from 'react';
import { Link, useLocation } from 'react-router-dom'; 
function PaginaError() { 
  
    return (
        <div className="container d-flex flex-column justify-content-center align-items-center vh-100 text-center">
            <div className="card shadow-lg p-5 border-0">
                <h1 className="display-1 text-danger">Hola</h1>
                <h2 className="mb-3">Errro algo salio mal</h2>
                <h3 className="text-muted mb-4 lead">
                    la pagina web no existe 
                </h3> 
                <Link to="/" className="btn btn-primary btn-lg rounded-pill px-4">
                    Volver al Inicio
                </Link>
            </div>
        </div>
    );
}

export default PaginaError;