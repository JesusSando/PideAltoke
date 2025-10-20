import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/iniciarSesion-Registro.css";
import { validarCorreo } from "../assets/js/validarcorreo"; 

export function Registrarse() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleRegistro = (e) => {
    e.preventDefault();
    setMensaje("");

    
    if (!nombre || !correo || !contraseña) {
      setMensaje("Por favor completa todos los campos.");
      return;
    }

    
    if (!validarCorreo(correo)) {
      setMensaje("Por favor ingresa un correo electrónico válido.");
      return;
    }

    
    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
    const existe = usuariosGuardados.find((u) => u.correo === correo);

    if (existe) {
      setMensaje("Este correo ya está registrado.");
      return;
    }

    // ✅ Crear nuevo usuario
    const nuevoUsuario = { nombre, correo, contraseña, cargo: "cliente" };
    usuariosGuardados.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));

    setMensaje("Registro exitoso. Serás redirigido al inicio de sesión...");
    setTimeout(() => navigate("/iniciarsesion"), 1500);
  };

  return (
    <div className="contenedor">
      <div className="formulario" id="registro">
        <h2 className="titulo">Registro de usuario</h2>
        {mensaje && (
          <p
            style={{
              color: mensaje.includes("exitoso") ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            {mensaje}
          </p>
        )}

        <form onSubmit={handleRegistro}>
          <label htmlFor="nombre">Nombre completo</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            placeholder="ejemplo@correo.com"
          />

          <label htmlFor="contraseña">Contraseña</label>
          <input
            type="password"
            id="contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
            placeholder="********"
          />

          <button type="submit" className="enviar">Registrarse</button>
        </form>
      </div>
    </div>
  );
}

export default Registrarse;
