import React, { useEffect ,useState} from 'react';
import ProductoService from "../service/ProductoService"; 
import axios from 'axios';

function AdminProducto() {
    const [productoEditado, setProductoEditado] = useState({
        id: null,
        nombre: '',
        stok: '',
        fecha_vencimiento: '',
        img: '',
        imgFile: null, 
        imgPreview: '',
    });

    const [editando, setEditando] = useState(false);
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true); 
     

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const rutUsuario = usuario?.rut || "Anonimo";


    const cargarProductos = async () => { 
        setLoading(true);
        try { 
            const res = await ProductoService.getAll(); 
            setProductos(res.data);
        } catch (error) {
            console.error('Error al cargar los productos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarProductos();
    }, []);
 
    const handleEdit = (producto) => {
        setProductoEditado({
            id: producto.id,
            nombre: producto.nombre,
            stok: producto.stok,
            fecha_vencimiento: producto.fecha_vencimiento,
            img: producto.img || '',  
            imgFile: null, 
            imgPreview: producto.img ? `http://98.95.19.168:8080/uploads/${producto.img}` : ''
           
        });
        setEditando(true); 
    }; 
    const handleChange = (e) => {
        const { name, value, files } = e.target;

       if (name === 'img' && files.length > 0) {
            setProductoEditado({
                ...productoEditado,
                img: files[0],  
                imgPreview: URL.createObjectURL(files[0])  
            });
        } else { 
            setProductoEditado({
                ...productoEditado,
                [name]: value,
            });
        }
    }; 
    const handleSubmit = async (e) => {
        e.preventDefault();
 
        const formData = new FormData();
        formData.append('nombre', productoEditado.nombre);
        formData.append('stok', productoEditado.stok);
        formData.append('fecha_vencimiento', productoEditado.fecha_vencimiento);
        formData.append('rutUsuario', rutUsuario); 
        if (productoEditado.img instanceof File) {
            formData.append('imagen', productoEditado.img);
        }

        try {
            if (editando) {  
                await ProductoService.update(productoEditado.id, formData);
                alert('Producto actualizado con éxito');
            } else { 
                await ProductoService.registrar(formData);
                alert('Producto creado con éxito');
            }
            cargarProductos();
            handleCancel();
        } catch (error) {
            console.error("Error al guardar:", error);
            alert("Error al guardar producto. Revisa la consola.");
        }
    };



    const handleCancel = () => {
        setProductoEditado({
            id: 0,
            nombre: '',
            stok: '',
            fecha_vencimiento: '',
            img: '',
            imgFile: null,
            imgPreview: ''
        });
        setEditando(false); 
    };

    const handleDelete = async (id, nombre) => {
        if (window.confirm(`¿Estás seguro de eliminar ${nombre}?`)) {
            try { 
                await ProductoService.delete(id, rutUsuario); 
                alert('Producto eliminado.');
                cargarProductos();
            } catch (error) {
                console.error("Error al eliminar:", error);
                alert("Error al eliminar.");
            }
        }
    };


    if (loading) return <div className="container py-5 text-center">Cargando productos...</div>;

    return (
        <div className="container"> 
            
            <div className="form-container">
                <h2>{editando ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h2>
                <form onSubmit={handleSubmit}>
                    <p>Nombre producto </p>
                    <input
                        name="nombre"
                        type="text"
                        value={productoEditado.nombre}
                        onChange={handleChange}
                        placeholder="Nombre del producto"
                        required
                    /> 
                    <p>Stok</p>
                    <input
                        name="stok"
                        type="number"
                        value={productoEditado.stok}
                        onChange={handleChange}
                        placeholder="Cantidad (Stock)"
                        required
                        min={editando ? 0 : 1}   
                        max={200}  
                    /> 
                    <p>Fecha vencimiento</p>
                    <input
                        name="fecha_vencimiento"
                        type="date" 
                        value={productoEditado.fecha_vencimiento}
                        onChange={handleChange}
                        placeholder="Fecha de vencimiento"
                        required
                        min={new Date().toISOString().split("T")[0]}
                    />

                   

                    <label htmlFor="imgFile">Imagen del producto:</label> 
                    <input
                        id="imgFile"
                        name="img" 
                        type="file"
                        onChange={handleChange}
                        accept="image/*"
                    />


                    {(productoEditado.imgPreview) && (
                        <div style={{marginTop: '10px'}}>
                            <p>Vista Previa:</p>
                            <img  
                                src={productoEditado.imgPreview} 
                                alt="Vista previa" 
                                style={{width:'150px', height:'auto', objectFit: 'cover', border: '2px solid #ddd'}}
                            />
                        </div>
                    )}
                    <button type="submit">
                        {editando ? 'Guardar Cambios' : 'Agregar Producto'}
                    </button>

                    {editando && (
                        <button type="button" onClick={handleCancel}>Cancelar</button>
                    )}
                </form>
            </div>

            <hr/> 
            <div className="product-list">
                <h3>Lista de Productos</h3>
                {productos.map((producto) => (
                    <div key={producto.id} className="product-item">

                        <div className="product-details">
                            <p><strong>{producto.nombre}</strong> ID: {producto.id}</p>
                            <small>Stock: {producto.stok}<br/> Vence: {producto.fecha_vencimiento}</small>
                        </div>
                        {producto.img && <img src={`http://98.95.19.168:8080/uploads/${producto.img}`} alt="prod" style={{ width: '80px' }} />}
                        
                        <div className="product-actions">
                            <button onClick={() => handleEdit(producto)}>Editar</button>
                            <button onClick={() => handleDelete(producto.id, producto.nombre)}>Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminProducto;