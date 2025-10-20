
export function validarRut(rut) {
  // Elimina puntos y pasa a minúsculas
  rut = rut.replace(/\./g, "").toLowerCase();

  // Verifica formato correcto (número + guión + dígito)
  const rutRegex = /^[0-9]+-[0-9kK]{1}$/;
  if (!rutRegex.test(rut)) return false;

  // Separa número del dígito verificador
  const [numero, dv] = rut.split("-");
  let suma = 0;
  let multiplicador = 2;

  // Recorre el número de atrás hacia adelante
  for (let i = numero.length - 1; i >= 0; i--) {
    suma += multiplicador * parseInt(numero[i]);
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const resto = 11 - (suma % 11);
  const dvCalculado =
    resto === 11 ? "0" : resto === 10 ? "k" : resto.toString();

  return dvCalculado === dv;
}
