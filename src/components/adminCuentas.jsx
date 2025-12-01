import React, { useEffect, useState } from 'react';
import UsuarioService from "../service/UsuarioService"; 

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
    };
 
    const handleChange = (e) => {
        const { name, value } = e.target; 
        setUsuarioEditado({
            ...usuarioEditado,
            [name]: value,
        });
    };  
    const handleSubmit = async (e) => {
        e.preventDefault();  
        const rolParaPayload = { id: parseInt(rolIdInput) }; 
        const usuarioPayload = { 
            ...usuarioEditado, 
            rol: rolParaPayload,
        };
        
        try {
            if (editando) { 
                await UsuarioService.update(usuarioPayload.id, usuarioPayload);
                alert(`Usuario ${usuarioPayload.nombre} actualizado correctamente.`);
            } else {  
                await UsuarioService.registrar(usuarioPayload);  
                alert(`Usuario ${usuarioPayload.nombre} agregado correctamente.`);
            }  
            const resLista = await UsuarioService.getAll();
            setUsuarios(resLista.data); 
            handleCancel(); 

        } catch (error) {
            console.error("Error al guardar usuario:", error); 
            alert("Error al guardar usuario. Revisa la consola y la implementación del Rol en el backend.");
        }
    }; 
    
    const handleDelete = async (id, nombre) => {
        if (window.confirm(`¿Estás seguro de eliminar al usuario ${nombre}?`)) {
            try {
                await UsuarioService.delete(id);
                alert(`Usuario ${nombre} eliminado.`); 
                const resLista = await UsuarioService.getAll();
                setUsuarios(resLista.data);
            } catch (error) {
                console.error("Error al eliminar usuario:", error);
                alert("Error al eliminar usuario.");
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
        <div className="container py-4"> 
            <div className="form-container mb-5 p-4 border rounded shadow-sm">
                <h2 className="mb-4">{editando ? `Editar: ${usuarioEditado.nombre}` : 'Agregar Nuevo Usuario'}</h2>
                <form onSubmit={handleSubmit} className="row g-3">
       
                    <div className="col-md-6">
                        <input
                            name="rut"
                            type="text"
                            className="form-control"
                            value={usuarioEditado.rut}
                            onChange={handleChange}
                            placeholder="RUT"
                            required
                        />
                    </div>  
                    <div className="col-md-6">
                        <input
                            name="nombre"
                            type="text"
                            className="form-control"
                            value={usuarioEditado.nombre}
                            onChange={handleChange}
                            placeholder="Nombre"
                            required
                        />
                    </div>  
                    <div className="col-md-6">
                        <input
                            name="correo"
                            type="email"
                            className="form-control"
                            value={usuarioEditado.correo}
                            onChange={handleChange}
                            placeholder="Correo"
                            required
                        />
                    </div>  
                    <div className="col-md-6">
                        <input
                            name="contrasena"
                            type="text"  
                            className="form-control"
                            value={usuarioEditado.contrasena}
                            onChange={handleChange}
                            placeholder="Contraseña"
                            required
                        />
                    </div>  
                    <div className="col-md-6">
                        <input
                            name="comuna"
                            type="text"
                            className="form-control"
                            value={usuarioEditado.comuna}
                            onChange={handleChange}
                            placeholder="Comuna"
                            required
                        />
                    </div>  
                    <div className="col-md-6">
                        <label htmlFor="rolSelect" className="form-label">Rol del Usuario</label>
                        <select
                            id="rolSelect"
                            className="form-control"
                            value={rolIdInput}
                            onChange={(e) => setRolIdInput(e.target.value)}
                            required
                        >
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
                            <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(usuario)}>Editar</button>
                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(usuario.id, usuario.nombre)}>Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminCuenta;