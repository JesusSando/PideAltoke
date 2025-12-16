 
import UsuarioService from "../../service/UsuarioService";
import Swal from 'sweetalert2';
export function validarCorreo(correo) {
  
 return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)
 
}

export function validarContraseñaSegura(contraseña){
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(contraseña);
}

 

export function validarRut(rut) {
  rut = rut.replace(/[^\dkK]/g, '').toUpperCase();
  if (!/^\d{1,8}[K\d]$/.test(rut)) return false;
  let dv = rut.slice(-1);
  let rutSinDv = rut.slice(0, -1);
  let suma = 0;
  let multiplo = 2;
  for (let i = rutSinDv.length - 1; i >= 0; i--) {
    suma += parseInt(rutSinDv[i]) * multiplo;
    multiplo++;
    if (multiplo === 8) multiplo = 2;
  }
  let dvEsperado = 11 - (suma % 11);
  if (dvEsperado === 11) dvEsperado = "0";
  else if (dvEsperado === 10) dvEsperado = "K";
  else dvEsperado = String(dvEsperado);
  return dvEsperado === dv;
}




 
  export const verificarCorreoExiste = async (correo, setCorreoValido, setMensajeCorreo) => {
  if (!correo) return;  
    const response = await UsuarioService.verificarCorreoExistente(correo); 
    if (response.data === true) {
      setCorreoValido(false);  
      setMensajeCorreo("El correo ya existe");
      
    } else {  
      setCorreoValido(true);  
      setMensajeCorreo(""); 
    }
 
};