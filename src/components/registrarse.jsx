import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import "../assets/css/iniciarSesion-Registro.css";
import { validarCorreo ,validarContraseñaSegura,validarRut,verificarCorreoExiste} from "../assets/js/validarcorreo"; 
import UsuarioService from "../service/UsuarioService";
import Swal from 'sweetalert2';


function Registrarse() {
   const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
     const [contraseña, setContraseña] = useState("");
  const [rut, setRut] = useState("");
  const [comuna, setComuna] = useState("");
  const [mensaje, setMensaje] = useState("");

  const [rutValido, setRutValido] = useState(null);
  const [correoValido, setCorreoValido] = useState(null);
  const [verPassword, setVerPassword] = useState(false);
  const [MensajeCorreo, setMensajeCorreo] = useState("");

    const navigate = useNavigate();

    const handleRutChange = (e) => {
    const valor = e.target.value;
    setRut(valor);

    if (valor.length > 3) {
      setRutValido(validarRut(valor));
    } else {
      setRutValido(null);
    }
  };

  const handleVerificarExistencia = () => {  
      verificarCorreoExiste(correo, setCorreoValido, setMensajeCorreo);
  };



  const handleCorreoChange = (e) => {
    const nuevoCorreo = e.target.value;
    setCorreo(nuevoCorreo);

    if (nuevoCorreo.length > 0) { 
      setCorreoValido(validarCorreo(nuevoCorreo));
    } else {
      setCorreoValido(null);  
    }
  };

    const handleRegistro = async (e) => {
    e.preventDefault();
    setMensaje("");

    if (!nombre || !correo || !contraseña || !rut || !comuna) {
      setMensaje("Por favor completa todos los campos.");
      return;
    }

    if (!validarCorreo(correo)) {
      setMensaje("Correo invalido.");
      return;
    }
 
     const checkExiste = await UsuarioService.verificarCorreoExistente(correo);
       if (checkExiste.data === true) {
          setMensaje("El correo ya esta registrado");
           setCorreoValido(false);  
          return;  
      }
    

    if (!validarContraseñaSegura(contraseña)) {
      setMensaje("Contraseña insegura.");
      return;
    } 
    if (!validarRut(rut)) {
      setMensaje("Rut no valido.");
      return;
    }

     
    

    const data = { nombre, correo, contrasena: contraseña, rut, comuna };

    try {
      await UsuarioService.registrar(data); 
       await Swal.fire({
              position: "top-end", 
              icon: "success",
              title: "Registro completado",
              showConfirmButton: false, 
              timer: 2000, 
              toast: true, 
              background: '#333',
              color: '#fff' 
          }); 
      navigate("/iniciarsesion");
    } catch (err) {
      console.error(err);
      navigate('/error');
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
          <input type="text" placeholder="Juan Torres" value={nombre} onChange={(e) => setNombre(e.target.value)} required />

         <div className="mb-3">
            <label className="form-label">Rut</label>
            <input 
                type="text" 
                className={`form-control ${rutValido === true ? 'is-valid' : rutValido === false ? 'is-invalid' : ''}`}
                placeholder="19.123.143-1"  value={rut}  onChange={handleRutChange}   required   />
            {rutValido === false && <div className="invalid-feedback">RUT inválido</div>}
          </div>

          <label>Correo</label>
          <div className="mb-3">
            <input type="email"  placeholder="ejemplo@ejemplo.com"  value={correo}  onChange={handleCorreoChange}  onBlur={handleVerificarExistencia}
              required  className={`form-control ${correoValido === true ? 'is-valid' : correoValido === false ? 'is-invalid' : ''}`}/>
            <div className="invalid-feedback"> {MensajeCorreo}</div>
          </div>


          <label>Contraseña</label>
          <div className="contraseña-registro">
  
            <input  type={verPassword ? "text" : "password"} 
              className="form-control contraseña-input" 
              value={contraseña} 
              onChange={(e) => setContraseña(e.target.value)} 
              required     />

            <p className="contraseña-icono material-symbols-outlined"  onClick={() => setVerPassword(!verPassword)} >
              {verPassword ? "visibility_off" : "visibility"}
            </p> 
          </div>

          <label>Comuna</label>
          <select value={comuna} onChange={(e) => setComuna(e.target.value)} required  className="form-select  "  >
              <option value="">Selecciona tu comuna</option>
              <option value="1">Santiago</option>
              <option value="2">Maipu</option>
              <option value="3">Cerrillos</option>
              <option value="4">Estacion central</option>
              <option value="5">Las condes</option>
              <option value="6">La cisterna</option>
              <option value="7">La florida</option>
              <option value="8">Providencia</option>
              <option value="9">Quinta normal</option>
              <option value="10">Independencia</option>
              <option value="11">La pintana</option>
              <option value="12">Lo prado</option>
              <option value="13">macul</option>
          </select><br/><br/>

          <button type="submit">Registrarse</button>
        </form>
      </div>
      <br />
      <Link to="/iniciarsesion" className="btn btn-danger  px-4">
        iniciar sesion
      </Link>
      
    </div>
    </>
  );
}
 

export default Registrarse;
