import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/iniciarSesion-Registro.css";
import { validarCorreo ,validarContraseñaSegura} from "../assets/js/validarcorreo"; 

function Registrarse() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mensaje, setMensaje] = useState("");
 

  const handleRegistro = (e) => {
    e.preventDefault();
    setMensaje("");

    
    if (!nombre || !correo || !contraseña) {
      setMensaje("Por favor completa todos los campos.");
      return;
    }

    
    if (!validarCorreo(correo)) {
      setMensaje("Por favor ingresa un correo electrónico valido.");
      return;
    }

    if(!validarContraseñaSegura(contraseña)){
       setMensaje("La contraseña debe tener 8 caracteres una miniscula mayuscula un caracter especial y un numero ");
        return;
    }

  }
    

  return (
    <>
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
    </>
  );
}
 

export default Registrarse;
