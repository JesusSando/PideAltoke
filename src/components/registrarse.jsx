import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import "../assets/css/iniciarSesion-Registro.css";
import { validarCorreo ,validarContraseñaSegura,validarRut} from "../assets/js/validarcorreo"; 
import UsuarioService from "../service/UsuarioService";

function Registrarse() {
   const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
     const [contraseña, setContraseña] = useState("");
  const [rut, setRut] = useState("");
  const [comuna, setComuna] = useState("");
  const [mensaje, setMensaje] = useState("");

  const navigate = useNavigate();

  const handleRegistro = async (e) => {
    e.preventDefault();
    setMensaje("");

    if (!nombre || !correo || !contraseña || !rut || !comuna) {
      setMensaje("Por favor completa todos los campos.");
      return;
    }

    if (!validarCorreo(correo)) {
      setMensaje("Correo inválido.");
      return;
    }

    if (!validarContraseñaSegura(contraseña)) {
      setMensaje("Contraseña insegura.");
      return;
    } 
    if (!validarRut(rut)) {
      setMensaje("Rut no válido.");
      return;
    }

    const data = { nombre, correo, contrasena: contraseña, rut, comuna };

    try {
      await UsuarioService.registrar(data);
      alert("Registro completado");
      navigate("/iniciarsesion");
    } catch (err) {
      console.error(err);
      setMensaje(err.response?.data?.message || "Error al registrar usuario");
    }
  };

  return (
    <>
    <div className="contenedor">
      <div className="formulario" id="registro">
        <h2 class="text-danger">Registro de usuario</h2>
        {mensaje && <p style={{ color: "red", fontWeight: "bold" }}>{mensaje}</p>}
        <form onSubmit={handleRegistro}>
          <label>Nombre completo</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />

          <label>Rut</label>
          <input type="text" value={rut} onChange={(e) => setRut(e.target.value)} required />

          <label>Correo</label>
          <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required />

          <label>Contraseña</label>
          <input type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} required />

          <label>Comuna</label>
          <input type="text" value={comuna} onChange={(e) => setComuna(e.target.value)} required />

          <button type="submit">Registrarse</button>
        </form>
      </div>
      <br />
      <Link to="/iniciarsesion" class="text-danger">
        iniciar sesion
      </Link>
    </div>
    </>
  );
}
 

export default Registrarse;
