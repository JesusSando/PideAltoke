import React, { useEffect ,useState} from 'react';
import ProductoService from "../service/ProductoService"; 

function AdminProducto() {
    const [productoEditado, setProductoEditado] = useState({
        id: 0,
        nombre: '',
        stok: '',
        fecha_vencimiento: '',
        img: '',  
        imgFile: null, 
        imgPreview: null,  
        nombre_modificado: '',
        fecha_modificacion: ''
    });

    const [editando, setEditando] = useState(false);
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true); 
     
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
            imgPreview: producto.img || null,  
            nombre_modificado: producto.nombre_modificado,
            fecha_modificacion: producto.fecha_modificacion
        });
        setEditando(true);  
    }; 
    const handleChange = (e) => {
        const { name, value, files } = e.target;  

        if (name === 'imgFile' && files.length > 0) { 
            const file = files[0];
            const tempUrl = URL.createObjectURL(file);
            
            setProductoEditado(prev => ({
                ...prev,
                imgFile: file,
                imgPreview: tempUrl,
            }));

        } else { 
            setProductoEditado(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    }; 
    const handleSubmit = async (e) => {
        e.preventDefault();  
        
        let imgFinalUrl = productoEditado.img;  
 
        if (productoEditado.imgFile) { 
            
            imgFinalUrl = 'img/uploads/' + productoEditado.imgFile.name; 
            console.log("Ruta de imagen a guardar:", imgFinalUrl);
        } 
        
        const productoPayload = {  
            id: productoEditado.id, 
            nombre: productoEditado.nombre,
            stok: parseInt(productoEditado.stok),  
            fecha_vencimiento: productoEditado.fecha_vencimiento, 
            img: imgFinalUrl || '../src/assets/images/default.jpg', 
            nombre_modificado: productoEditado.nombre_modificado,
            fecha_modificacion: productoEditado.fecha_modificacion, 
        }; 

        try {
            if (editando) {
                await ProductoService.update(productoPayload.id, productoPayload);
                alert(`Producto ${productoPayload.nombre} actualizado.`);
            } else {
                await ProductoService.registrar(productoPayload);
                alert(`Producto ${productoPayload.nombre} agregado.`);
            } 
            
            cargarProductos(); 
            handleCancel(); 

        } catch (error) {
            console.error("Error al guardar producto:", error);
            alert("Error al guardar producto. Revisa la consola y el backend.");
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
            imgPreview: null,
            nombre_modificado: '',
            fecha_modificacion: ''
        });
        setEditando(false); 
    };

    const handleDelete = async (id, nombre) => {
        if (window.confirm(`¿Estás seguro de eliminar el producto ${nombre}?`)) {
            try {
                await ProductoService.delete(id);
                alert(`Producto ${nombre} eliminado.`);
                cargarProductos();
            } catch (error) {
                console.error("Error al eliminar producto:", error);
                alert("Error al eliminar producto.");
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
                    /> 
                    <p>Fecha vencimiento</p>
                    <input
                        name="fecha_vencimiento"
                        type="date" 
                        value={productoEditado.fecha_vencimiento}
                        onChange={handleChange}
                        placeholder="Fecha de vencimiento"
                        required
                    />

                    <p>Nombre modificador</p>
                    <input
                        name="nombre_modificado"
                        type="text"
                        value={productoEditado.nombre_modificado}
                        onChange={handleChange}
                        placeholder="Nombre de quien modifica"
                        required
                    />
            
                    <label htmlFor="imgFile">Imagen del producto:</label>
                    <input
                        id="imgFile"
                        name="imgFile"
                        type="file"
                        onChange={handleChange}
                        accept="image/*"
                    /> 
                    {(productoEditado.imgPreview || productoEditado.img) && (
                        <div>
                            <p>Vista Previa:</p>
                            <img  
                                src={productoEditado.imgPreview || productoEditado.img} 
                                alt="Vista previa/guardada" 
                                style={{width:'150px', height:'auto', objectFit: 'cover'}}
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
                            <p><strong>{producto.nombre}</strong> (ID: {producto.id})</p>
                            <small>Stock: {producto.stok} | Vence: {producto.fecha_vencimiento}</small>
                            <small>Modificado por: {producto.nombre_modificado} el {producto.fecha_modificacion}</small>
                        </div>
                        {producto.img && <img src={producto.img} alt="Producto" style={{width:'100px', height:'100px', objectFit: 'cover'}}/>}
                        
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