// validarCorreo.js

/**

 * @param {string} correo -
 * @returns {boolean} 
 */
export function validarCorreo(correo) {
  
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(correo);
}
