import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { inicioSesion } from '../assets/js/cargo';  

export function IniciarSesion() {
  const [correo,setCorreo]=useState('');
  const [contraseña,setContraseña]=useState('');
  const [error,setError]=useState('');
  const navigate=useNavigate();

  const handleSubmit=async(e) => {
    e.preventDefault();  
    setError('');
    try {
      const usuario = await inicioSesion(correo, contraseña);
      if (usuario) {
        if (usuario.cargo==='admin' || usuario.cargo==='empleado') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        setError('Correo o contraseña incorrectos');
      }
    } catch (err) {
      console.error(err);
      setError('No se pudo iniciar sesión. Revisa la consola.');
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
            required
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />

          <label htmlFor="contraseña">Contraseña</label>
          <input
            type="password"
            id="contraseña"
            required
            value={contraseña}   
            onChange={(e) => setContraseña(e.target.value)}
          />

          <button type="submit" className="enviar">Iniciar Sesión</button>

          <button
            type="button"
            className="enviar"
            onClick={() => navigate("/registrarse")}
          >
            Registrarse
          </button>

          

            <button

              type="button"
              className="enviar"
              onClick={() => window.location.href = "https://accounts.google.com/"}
            >
              Iniciar sesion con Google
            </button>

        </form>

        <p style={{ marginTop: "10px" }}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/olvidadocontrasena");
            }}
          >
            ¿Olvidaste tu contraseña?
          </a>
        </p>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
}
