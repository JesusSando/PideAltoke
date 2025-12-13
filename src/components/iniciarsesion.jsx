import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UsuarioService from "../service/UsuarioService";
import { validarCorreo } from '../assets/js/validarcorreo';
import { notificarCambioUsuario } from '../assets/js/cargo';


 
 

export function IniciarSesion() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validarCorreo(correo)) {
      setError("Correo inválido");
      return;
    }

    try {
      const res = await UsuarioService.login(correo, contraseña);
      const usuario = res.data;
      localStorage.setItem("usuario", JSON.stringify(usuario));
      notificarCambioUsuario();

      if (usuario.rol.nombre === "ADMIN" || usuario.rol.nombre === "EMPLEADO") {
        navigate("/adminProducto");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) setError("Correo o contraseña incorrectos");
      else setError("Error al iniciar sesión");
    }
  };

  return (
    <div className="contenedor">
      <div className="formulario" id="inicio-sesion">
        <h2 class="text-danger">Inicio de sesión</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>Correo</label>
          <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
          <label>Contraseña</label>
          <input type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} required />
          <button type="submit">Iniciar Sesión</button>
        </form>
           
      </div>
      <br />
      <Link to="/registrarse"  className="btn btn-danger px-4" >
        Regístrate aquí
      </Link>
      <br />
       <Link to="/olvidadocontrasena" className="btn btn-success mt-4  px-4">
             Olvide contraseña
       </Link>
    </div>
  );
}

 