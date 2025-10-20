import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/iniciarSesion-Registro.css";
import { validarCorreo } from "../assets/js/validarcorreo";
import { validarRut } from "../assets/js/validarrut"; // 👈 import nuevo

export function Registrarse() {
  const [nombre, setNombre] = useState("");
  const [rut, setRut] = useState("");
  const [comuna, setComuna] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleRegistro = (e) => {
    e.preventDefault();
    setMensaje("");

    // Validar campos vacíos
    if (!nombre || !rut || !comuna || !correo || !contraseña) {
      setMensaje("Por favor completa todos los campos.");
      return;
    }

    // Validar correo
    if (!validarCorreo(correo)) {
      setMensaje("Por favor ingresa un correo electrónico válido.");
      return;
    }

    // ✅ Validar RUT usando la función externa
    if (!validarRut(rut)) {
      setMensaje("Por favor ingresa un RUT válido (ej: 12345678-9).");
      return;
    }

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

          <label htmlFor="rut">RUT</label>
          <input
            type="text"
            id="rut"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            required
            placeholder="Ej: 12345678-9"
          />

          <label htmlFor="comuna">Comuna</label>
          <input
            type="text"
            id="comuna"
            value={comuna}
            onChange={(e) => setComuna(e.target.value)}
            required
            placeholder="Ej: Santiago Centro"
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
