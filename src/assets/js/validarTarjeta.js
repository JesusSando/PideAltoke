// validarTarjeta.js

/**
 * Valida si un número de tarjeta tiene el formato correcto y pasa el algoritmo de Luhn.
 * @param {string} numeroTarjeta 
 * @returns {boolean} 
 */
export function validarTarjeta(numeroTarjeta) {
  if (!numeroTarjeta) return false;

  // Eliminar espacios y caracteres no numéricos
  const soloDigitos = numeroTarjeta.replace(/\D/g, "");

  
  if (soloDigitos.length !== 16) return false;

  // Algoritmo de Luhn (verifica validez del número)
  let suma = 0;
  let alternar = false;

  for (let i = soloDigitos.length - 1; i >= 0; i--) {
    let n = parseInt(soloDigitos[i], 10);

    if (alternar) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    suma += n;
    alternar = !alternar;
  }

  return suma % 10 === 0;
}
