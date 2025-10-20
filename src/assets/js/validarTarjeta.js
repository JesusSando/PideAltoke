
export function validarTarjeta(numeroTarjeta) {

  const soloDigitos = numeroTarjeta.replace(/\D/g, "");
  if (soloDigitos.length !== 16) return false;

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
 