function mostrarInicioSesion() {
  document.getElementById("inicio-sesion").style.display = "block";
  document.getElementById("registro").style.display = "none";
  return false;
}
function mostrarRegistro() {
  document.getElementById("registro").style.display = "block";
  document.getElementById("inicio-sesion").style.display = "none";
}
function verificar() {
  document.getElementById("enviarCodigo").style.display = "block";
  document.getElementById("registro").style.display = "none";
  document.getElementById("inicio-sesion").style.display = "none";
  return false;
}
function continuar() {
  document.getElementById("enviarCodigo").style.display = "none";
  document.getElementById("verificacion").style.display = "block";
  return false;
}

function nuevaContraseña() {
  document.getElementById("verificacion").style.display = "none";
  document.getElementById("nuevaContraseña").style.display = "block";
    return false;
}
function aceptar() {

  document.getElementById("inicio-sesion").style.display = "block";
  document.getElementById("nuevaContraseña").style.display = "none";


}
function iniciarSesion(){
  document.getElementById("principal").style.display = "block";
  document.getElementById("inicio-sesion").style.display = "none";

  
}
function redirigirFormulario() {
  window.location.href = "index.html";
  return false;
}


