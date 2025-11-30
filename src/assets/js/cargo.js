let CargoUsuario=null;

export async function cargarUsuarios(){
    const res=await fetch('/json/usuarios.json');
    if(!res.ok){
        throw new Error ('Error al cargar los usuarios');
    }
    return await res.json();
}

export async function inicioSesion(correo,contraseña){
    const usuarios=await cargarUsuarios();
    const usuario=usuarios.find(u=>u.correo===correo && u.contraseña===contraseña);
    if(usuario){
        CargoUsuario=usuario;
        sessionStorage.setItem('usuario',JSON.stringify(usuario));
        window.dispatchEvent(new Event('usuarioCargado')); 
        return usuario;
    }
    return null;
}

export const notificarCambioUsuario = () => {
  window.dispatchEvent(new Event('usuarioCargado')); 
};
 
/**
 * 
 * @returns {object | null}  
 */
export const obtenerUsuario = () => {
  const usuarioStr = localStorage.getItem("usuario");
  if (usuarioStr) {
    try {
      const usuario = JSON.parse(usuarioStr);
       
      return usuario;
    } catch (e) {
      console.error("Error al parsear el usuario de localStorage:", e);
      return null;
    }
  }
  return null;
};

 
export const cerrarSesion = () => {
  localStorage.removeItem("usuario");
 
  window.dispatchEvent(new Event('usuarioCargado')); 
};
 
 