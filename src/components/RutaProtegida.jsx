import React from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
 
function RutaProtegida() { 
    const usuarioGuardado = localStorage.getItem('usuario'); 
    const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;  
    const esAdmin = usuario && usuario.rol && usuario.rol.nombre === 'ADMIN'; 
    if (!esAdmin) {  
        return <Navigate to="/error" replace />;
    } 
    return <Outlet/>;
}

export default RutaProtegida; 