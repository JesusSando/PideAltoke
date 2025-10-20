import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/iniciarSesion-Registro.css";
import { validarCorreo ,validarContraseñaSegura,validarRut} from "../assets/js/validarcorreo"; 

function Registrarse() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
    const [rut, setRut] = useState("");
 
    const [comuna, setComuna] = useState("");
  const [mensaje, setMensaje] = useState("");
 

  const handleRegistro = (e) => {
    e.preventDefault();
    setMensaje("");

    
    if (!nombre || !correo || !contraseña ||!rut ||!comuna ||!nombre) {
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
    if(!validarRut(rut)){
       setMensaje("El rut no es valido ");
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

          <label htmlFor="text">Rut</label>
          <input
            type="text"
            id="rut"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            required
            placeholder="2195366-6"
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



          <label htmlFor="contraseña">Comuna</label>
          <input
            type="text"
            id="comuna"
            value={comuna}
            onChange={(e) => setComuna(e.target.value)}
            required
            placeholder="Santiago"
          />

          <button type="submit" className="enviar">Registrarse</button>
        </form>
      </div>
    </div>
    </>
  );
}
 

export default Registrarse;
