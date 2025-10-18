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
export function cerrarSesion(){
    CargoUsuario=null;
    sessionStorage.removeItem('usuario');
}

export function obtenerUsuario(){
    if(CargoUsuario)
        return CargoUsuario;
    const usuario=sessionStorage.getItem('usuario');
    if(usuario){
        CargoUsuario=JSON.parse(usuario);
        return CargoUsuario;
    }
    return null;
}