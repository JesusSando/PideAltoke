 
export function validarCorreo(correo) {
  
 return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)
 
}

export function validarContraseñaSegura(contraseña){
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(contraseña);
}

