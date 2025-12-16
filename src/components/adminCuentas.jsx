import React, { useEffect, useState } from 'react';
import UsuarioService from "../service/UsuarioService"; 
import {validarCorreo,validarContraseñaSegura, validarRut } from "../assets/js/validarcorreo";
import Swal from 'sweetalert2';
function AdminCuenta() {
 
    const [usuarioEditado, setUsuarioEditado] = useState({ 
        id: 0, 
        nombre: '',
        correo: '',
        rut: '',  
        contrasena: '', 
        comuna: '',
        rol: { id: 0, nombre: '' }, 
        logoUri: '', 
    }); 
    const [rolIdInput, setRolIdInput] = useState('2');  

    const [editando, setEditando] = useState(false);
    const [usuarios, setUsuarios] = useState([]); 
    const [loading, setLoading] = useState(true); 


    const [errores, setErrores] = useState({});
    useEffect(() => {
        const cargarUsuarios = async () => { 
            try { 
                const res = await UsuarioService.getAll(); 
                setUsuarios(res.data);
            } catch (error) {
                console.error('Error al cargar los usuarios:', error);
            } finally {
                setLoading(false);
            }
        };
        cargarUsuarios();
    }, []);  

    const handleEdit = (usuario) => {
        setUsuarioEditado({
            id: usuario.id,
            nombre: usuario.nombre,
            correo: usuario.correo,
            rut: usuario.rut || '',  
            contrasena: usuario.contrasena,  
            comuna: usuario.comuna,
            rol: usuario.rol || { id: 0, nombre: '' },
            logoUri: usuario.logoUri || '',
        }); 
        setRolIdInput(usuario.rol ? String(usuario.rol.id) : '2'); 
        setEditando(true);
        setErrores({});
    };
 
    const handleChange = (e) => {
        const { name, value } = e.target; 
        setUsuarioEditado({
            ...usuarioEditado,
            [name]: value,
        });
        if (errores[name]) {
            setErrores({ ...errores, [name]: null });
        }
    };  



    const handleEmailBlur = async () => {
        if (!usuarioEditado.correo) return; 
        if (editando) {
            const usuarioOriginal = usuarios.find(u => u.id === usuarioEditado.id);
            if (usuarioOriginal && usuarioOriginal.correo === usuarioEditado.correo) return;
        }

        if (!validarCorreo(usuarioEditado.correo)) {
            setErrores(prev => ({ ...prev, correo: "Formato de correo inválido" }));
            return; } 
        try {
            const res = await UsuarioService.verificarCorreoExistente(usuarioEditado.correo);
            if (res.data === true) {
                setErrores(prev => ({ ...prev, correo: "El correo ya está registrado en el sistema." }));
            } else {
                setErrores(prev => ({ ...prev, correo: null })); 
            }
        } catch (error) {
            console.error("Error verificando correo", error);
        }
    };

 
    const validarFormulario = () => {
        const nuevosErrores = {}; 
        if (!validarRut(usuarioEditado.rut)) {
            nuevosErrores.rut = "RUT invalido (12345678-9)";
        } 
        if (!validarCorreo(usuarioEditado.correo)) {
            nuevosErrores.correo = "Correo inválido";
        } 
        if (!editando || (editando && usuarioEditado.contrasena !== "")) {  
             if (!validarContraseñaSegura(usuarioEditado.contrasena)) {
                nuevosErrores.contrasena = "debe tener mayuscula minuscula numero y caracter especial";
            }

        } 


        if (!usuarioEditado.comuna) {
            nuevosErrores.comuna = "Debes seleccionar una comuna.";
        } 
        setErrores(nuevosErrores); 
        return Object.keys(nuevosErrores).length === 0;
    };




    const handleSubmit = async (e) => {
        e.preventDefault();   
        if (!validarFormulario()) {
     
            return;
        } 
        if (errores.correo) {
            alert("El correo no es válido o ya existe");
            return;
        }
        const rolParaPayload = { id: parseInt(rolIdInput) }; 
        const usuarioPayload = { 
            ...usuarioEditado, 
            rol: rolParaPayload,
        };
        
        try {
            if (editando) { 
                await UsuarioService.update(usuarioPayload.id, usuarioPayload);
               await Swal.fire({
                        position: "top-end", 
                        icon: "success",
                        title: `Usuario ${usuarioPayload.nombre} actualizado correctamente`,
                        showConfirmButton: false, 
                        timer: 3000, 
                        toast: true, 
                        background: '#333',
                        color: '#4af380ff' 
                    }); 
            } else {  
                const { id, ...nuevoUsuario } = usuarioPayload;
                await UsuarioService.registrar(usuarioPayload);  
                await Swal.fire({
                        position: "top-end", 
                        icon: "success",
                        title: `Usuario ${usuarioPayload.nombre} agregado correctamente.`,
                        showConfirmButton: false, 
                        timer: 3000, 
                        toast: true, 
                        background: '#333',
                        color: '#4af380ff' 
                    }); 
                 
            }  
            const resLista = await UsuarioService.getAll();
            setUsuarios(resLista.data); 
            handleCancel(); 

        } catch (error) {
            console.error("Error al guardar usuario:", error); 
            alert("Error al guardar usuario");
        }
    }; 
    
    const handleDelete = async (id, nombre) => {
        if (window.confirm(`¿Estás seguro de eliminar al usuario ${nombre}?`)) {
            try {
                await UsuarioService.delete(id); 
                await Swal.fire({
                        position: "top-end", 
                        icon: "error",
                        title: `Usuario ${nombre} eliminado`,
                        showConfirmButton: false, 
                        timer: 3000, 
                        toast: true, 
                        background: '#333',
                        color: '#f34a4aff' 
                    }); 
                const resLista = await UsuarioService.getAll();
                setUsuarios(resLista.data);
            } catch (error) {
                console.error("Error al eliminar usuario:", error);
                alert("Error al eliminar usuario");
            }
        }
    }; 
    
    const handleCancel = () => {
        setUsuarioEditado({
            id: 0, 
            nombre: '',
            correo: '',
            rut: '',
            contrasena: '',
            comuna: '',
            rol: { id: 0, nombre: '' },
            logoUri: '',
        });
     
        setRolIdInput('2');
        setEditando(false);
    };


    if (loading) return <div className="container py-5 text-center">Cargando usuarios...</div>; 
    return (
        <div className="container py-4" id='formularioEditar'> 
            <div className="form-container mb-5 p-4 border rounded shadow-sm">
                <h2 className="mb-4">{editando ? `Editar: ${usuarioEditado.nombre}` : 'Agregar Nuevo Usuario'}</h2>
                <form onSubmit={handleSubmit} className="row g-3">
       
                    <div className="col-md-6">
                        <label className="form-label">RUT</label>
                        <input name="rut"  type="text"className={`form-control ${errores.rut ? 'is-invalid' : ''}`} value={usuarioEditado.rut}
                            onChange={handleChange}  placeholder="2187654-1" required  />
                         {errores.rut && <div className="invalid-feedback">{errores.rut}</div>}
                    </div>  

                    <div className="col-md-6">
                        <label className="form-label">Nombre</label>
                        <input name="nombre" type="text"
                            className="form-control" value={usuarioEditado.nombre}
                            onChange={handleChange} placeholder="Juan Torres" required  />
                    </div>  

                    <div className="col-md-6">
                        <label className="form-label">Correo</label>
                        <input  name="correo" type="email"
                            className={`form-control ${errores.correo ? 'is-invalid' : ''}`} value={usuarioEditado.correo}
                            onBlur={handleEmailBlur} onChange={handleChange}  placeholder="ejemplo@ejemplo.com" required />
                            {errores.correo && <div className="invalid-feedback">{errores.correo}</div>}
                    </div>  


                    <div className="col-md-6">
                        <label className="form-label">Contraseña</label>
                        <input name="contrasena" type="text"  className={`form-control ${errores.contrasena ? 'is-invalid' : ''}`}
                            value={usuarioEditado.contrasena} onChange={handleChange} placeholder="abcABC123***"
                            required />
                            {errores.contrasena && <div className="invalid-feedback">{errores.contrasena}</div>}
                    </div>  

                    <div className="col-md-6">
                        <label className="form-label">Comuna</label><br />
                        <select  name="comuna" value={usuarioEditado.comuna}  onChange={handleChange}  required  className={`form-select ${errores.comuna ? 'is-invalid' : ''}`} >
                            <option value="">Selecciona tu comuna</option>
                            <option value="1">Santiago</option>
                            <option value="2">Maipu</option>
                            <option value="3">Cerrillos</option>
                            <option value="4">Estacion central</option>
                            <option value="5">Las condes</option>
                            <option value="6">La cisterna</option>
                            <option value="7">La florida</option>
                            <option value="8">Providencia</option>
                            <option value="9">Quinta normal</option>
                            <option value="10">Independencia</option>
                            <option value="11">La pintana</option>
                            <option value="12">Lo prado</option>
                            <option value="13">macul</option>
                        </select>
                        {errores.comuna && <div className="invalid-feedback">{errores.comuna}</div>}
                    </div>  


                    <div className="col-md-6">
                        <label htmlFor="rolSelect" className="form-label">Rol del Usuario</label>
                        <select  id="rolSelect"
                            className="form-control" value={rolIdInput} onChange={(e) => setRolIdInput(e.target.value)} required  >
                            <option value="1">1 - ADMIN</option>
                            <option value="2">2 - CLIENTE</option> 
                        </select>
                    </div>
 
                    <div className="col-12 mt-4">
                        <button type="submit" className={`btn btn-${editando ? 'success' : 'primary'} me-2`}>
                            {editando ? 'Guardar Cambios' : 'Agregar Usuario'}
                        </button>

                        {editando && (
                            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                                Cancelar Edición
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <hr/>
 
            <h3 className="mb-3">Lista de Usuarios ({usuarios.length})</h3>
            <div className="list-group">
                {usuarios.map((usuario) => ( 
                    <div key={usuario.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center mb-2">
                        <div className="product-details">
                            <p className="mb-1"><strong>{usuario.nombre}</strong> (ID: {usuario.id})</p>
                            <small className="d-block">Rut: {usuario.rut} | Correo: {usuario.correo}</small>
                            <small className="d-block">Comuna: {usuario.comuna} | Rol: **{usuario.rol ? usuario.rol.nombre : 'Sin Rol'}**</small>
                        </div>
                        
                        <div className="product-actions">
                           <a href='#formularioEditar' >   <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(usuario)}>Editar</button></a>
                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(usuario.id, usuario.nombre)}>Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminCuenta;