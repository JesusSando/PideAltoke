import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UsuarioService from "../service/UsuarioService";
import { validarCorreo } from '../assets/js/validarcorreo';
import { notificarCambioUsuario } from '../assets/js/cargo';





export function IniciarSesion() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
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

      const credenciales = {
        correo: correo,
        contrasena: contrasena //mapeamos el estado contraseña
      };
      const res = await UsuarioService.login(credenciales);
      //extraer jwt y usuario 
      const { token, usuario } = res.data;

      if (usuario && token) {
        //gardar en localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("usuario", JSON.stringify(usuario));
        notificarCambioUsuario();
        alert("Bienvenido " + usuario.nombre);
        const rolNombre = usuario.rol ? usuario.rol.nombre : "";

        if (rolNombre === "ADMIN" || rolNombre === "EMPLEADO") {
          navigate("/adminEstadisticas");
        } else {
          navigate("/");
        }

      } else {
        setError("error");
      }

    } catch (err) {
      console.error(err);
      navigate('/error');
      if (err.response && err.response.status === 401) {
        setError("Correo o contraseña incorrectos.");
      } else {
        setError("Error al iniciar sesión. Intente más tarde.");
      }
    }finally{
      navigate('/error');
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
          <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
          <button type="submit">Iniciar Sesión</button>
        </form>

      </div>
      <br />
      <Link to="/registrarse" className="btn btn-danger px-4" >
        Regístrate aquí
      </Link>
      <br />
      <Link to="/olvidadocontrasena" className="btn btn-success mt-4  px-4">
        Olvide contraseña
      </Link>
    </div>
  );
}

