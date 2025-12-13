import React, { useState , useEffect} from "react"; 
import { validarCorreo } from '../assets/js/validarcorreo';
import UsuarioService from "../service/UsuarioService";
import { useNavigate, Link } from 'react-router-dom';

import { validarContraseñaSegura } from "../assets/js/validarcorreo"

export function OlvidadoContrasena() {
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");

  const navigate = useNavigate();

  const handleSubmit =async (e) => {
    e.preventDefault();
    setMensaje(""); 

    if (!validarCorreo(correo)) {
      setMensaje("Por favor, ingresa tu correo.");
      return;
    }
 
     const response = await UsuarioService.verificarCorreoExistente(correo);
      if (response.data === true) {
        
       localStorage.setItem("correoRecuperacion", correo);
            
            alert("Codigo enviado al correo");
            navigate('/olvidoContraseñacodigo');
     } else {
            setMensaje("Este correo no esta registrado."); 
          }
    

  };

  return (
    <div className="contenedor">
      <div className="formulario" id="olvidar">
        <h2 className="titulo">Recuperar contraseña</h2>
        {mensaje && <p style={{ color: "red" }}>{mensaje}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Ingresa tu correo</label>
          <input className="form-control" type="email" id="email" value={correo} onChange={(e) => setCorreo(e.target.value)}
            required  />
          <button type="submit" className="btn btn-success mt-4 px-4">
             Enviar código
          </button>
        </form>
      </div>
    </div>
  );
}

 


export function OlvidoContraseñacodigo(){
  const [codigo, setCodigo] = useState("");
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate(); 
    useEffect(() => {
        const correoGuardado = localStorage.getItem("correoRecuperacion");
        if (!correoGuardado) {
            alert("no hay correo para validar.");
            navigate('/olvidadoContrasena'); 
        }
    }, [navigate]);

    const handleSubmit = (e) => {
        e.preventDefault(); 
        if (codigo === "abc123") {
            navigate("/olvidoContraseñaRestrablecer");
        } else {
            setMensaje("codigo incorrecto");
        }
    };

   return (
  <div className="contenedor">
      <div className="formulario" id="olvidar">
  <h2 className="titulo">Verificacion</h2>
  {mensaje && <p style={{ color: "red" }}>{mensaje}</p>}
  <p>Introduce el codigo</p>
  <form onSubmit={handleSubmit}>
    <label  >Codigo</label>
    <input type="text"   value={codigo} onChange={(e) => setCodigo(e.target.value)} placeholder="ABCabc123***" className="form-control" required />
    <button type="submit" className="btn btn-success mt-4 px-4">
     Continuar
   </button>
  </form>
   
</div>
</div>
   );
}

 

export function OlvidoContraseñaRestrablecer(){
  const [pass1, setPass1] = useState("");
   const [pass2, setPass2] = useState("");
   const [mensaje, setMensaje] = useState("");
   const [correo, setCorreo] = useState("");
   
   const navigate = useNavigate();

   useEffect(() => {
       const correoGuardado = localStorage.getItem("correoRecuperacion");
       if (!correoGuardado) {
           navigate('/olvidadoContrasena');
       } else {
           setCorreo(correoGuardado);
       }
   }, [navigate]);

   const handleSubmit = async (e) => {
       e.preventDefault();
       setMensaje("");

       if (pass1 !== pass2) {
           setMensaje("Las contraseñas no coinciden ");
           return;
       }

       if (!validarContraseñaSegura(pass1)) {
            setMensaje("La contraseña debe tener  mayuscula minuscula numero y caracter especial");
            return;
        }

 
           await UsuarioService.cambiarContrasenaOlvidada(correo, pass1);
           
           alert("contraseña actualizada "); 
           localStorage.removeItem("correoRecuperacion");
           
           navigate("/iniciarsesion");

      
   };

   return (
     <div className="contenedor">
      <div className="formulario" id="olvidar">
 
  <form onSubmit={handleSubmit}>
    <label >Nueva contraseña</label>
     {mensaje && <p style={{ color: "red" }}>{mensaje}</p>}
    <input type="password" value={pass1}   onChange={(e) => setPass1(e.target.value)}  required  className="form-control" />
    <label >Repite la nueva contraseña</label>
    <input  type="password"  value={pass2}   onChange={(e) => setPass2(e.target.value)}   required  className="form-control" />
     <button type="submit" className="btn btn-danger mt-4 px-4">
       Confirmar Cambio
   </button>
  </form>
  
</div>

</div>

   );
}