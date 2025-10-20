import React, { useState } from "react";

export function OlvidadoContrasena() {
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!correo) {
      setMensaje("Por favor, ingresa tu correo.");
      return;
    }
 
    setMensaje("Si el correo existe, te enviaremos un enlace para restablecer tu contraseña.");
  };

  return (
    <div className="contenedor">
      <div className="formulario" id="olvidar">
        <h2 className="titulo">Recuperar contraseña</h2>
        {mensaje && <p style={{ color: "red" }}>{mensaje}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Ingresa tu correo</label>
          <input
            type="email"
            id="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
          <button type="submit" className="enviar">Enviar enlace</button>
        </form>
      </div>
    </div>
  );
}

export default OlvidadoContrasena;
