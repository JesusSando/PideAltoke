 
export function validarCorreo(correo) {
  
 return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)
 
}

export function validarContraseñaSegura(contraseña){
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(contraseña);
}

 

export function validarRut(rut){
 
  rut = rut.replace(/[^\dKk]/g, ''); 

 
  const formato = /^\d{7,8}[\dkK]$/;
  return formato.test(rut);
}
