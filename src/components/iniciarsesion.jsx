 
import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { inicioSesion } from '../assets/js/cargo';  

export function IniciarSesion() {
  const [correo,setCorreo]=useState('');
  const [contraseña, setContraseña] =useState('');
 
  const navigate=useNavigate();

  const handleSubmit=async(e) => {
    e.preventDefault();  

    const usuario =await inicioSesion(correo,contraseña);
    if (usuario) {
   
  
        navigate('/');
   
    } else {
      alert('Correo o contraseña incorrectos');
    }
  };

  return (
    <div className="contenedor">
      <div className="formulario" id="inicio-sesion">
        <h2 className="titulo">Inicio de sesión</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Correo</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          <label htmlFor="contraseña">Contraseña</label>
          <input
            type="password"
            id="contraseña"
            name="contraseña"
            required
            value={contraseña}   
            onChange={(e) => setContraseña(e.target.value)}
          />
          <button type="submit" className="enviar">Iniciar Sesión</button>
          <button type="submit" className="enviar">registrarse</button>
          <button type="submit" className="enviar">google</button>
        </form>
 
      </div>
    </div>
  );
}


