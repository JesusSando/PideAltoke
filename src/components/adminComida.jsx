 
import React, { useEffect ,useState} from 'react'; 
import ComidaService from '../service/ComidaService';

function ComidaAdmin() {
 const [comidas, setComidas] = useState([]);

    const [productoEditado, setProductoEditado] = useState({
        id: null,
        nombre: '',
        precio: '',
        descripcion: '',
        categoria: '',  
        oferta: false,
        precioOferta: 0,
        imagen: null,
        imagenPreview: '',
        nombre_modificado: '',
        fecha_modificacion: ''
    });

    const [editando, setEditando] = useState(false);

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const rutUsuario = usuario?.rut || "";

    const loadComidas = async () => {
        try {
            const response = await ComidaService.getAll();
            setComidas(response.data);
        } catch (error) {
            console.error("Error al cargar las comidas:", error);
        }
    };
    useEffect(() => {
        loadComidas();
    }, []);

    const handleEdit = (producto) => {

        setProductoEditado({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            descripcion: producto.descripcion,
              categoria: producto.categoria || producto.tipoComida || '', 

            oferta: producto.oferta || false,
            precioOferta: producto.precioOferta || 0,
            
            imagen: producto.imagen || null,
          
            imagenPreview: producto.imagen 
                ? `http://localhost:8080/uploads/${producto.imagen}` 
                : '', 
            
            nombre_modificado: producto.nombre_modificado,
            fecha_modificacion: producto.fecha_modificacion
        });
        setEditando(true);
    };


    const handleChange = (e) => {
        const { name, value, files, type, checked } = e.target; 

        if (name === 'imagen' && files.length > 0) {
            setProductoEditado({
                ...productoEditado,
                imagen: files[0],
                imagenPreview: URL.createObjectURL(files[0]),
            });
        } else if (type === 'checkbox') {
            setProductoEditado({
                ...productoEditado,
                [name]: checked,
            });
        } 
        else {
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
        formData.append('descripcion', productoEditado.descripcion);
        formData.append('precio', productoEditado.precio);
        formData.append('tipoComida', productoEditado.categoria || '');  
        formData.append('oferta', productoEditado.oferta);
        formData.append('precioOferta', productoEditado.precioOferta || 0);
        if (productoEditado.imagen && typeof productoEditado.imagen !== 'string') {
            formData.append('imagen', productoEditado.imagen);
        }
        
         formData.append('rutUsuario', rutUsuario);

        try {
            let res;

            if (editando) {
                res = await ComidaService.update(productoEditado.id, formData);
            } else {
                res = await ComidaService.add(formData);
            }

            console.log(`Comida ${editando ? 'actualizada' : 'creada'}:`, res.data);
            alert(`Comida ${editando ? 'actualizada' : 'creada'} con éxito!`);

            await loadComidas();
            handleCancel();

        } catch (error) {
            console.error("Error en la operación:", error.response || error);
            alert(`Error al ${editando ? 'editar' : 'agregar'} la comida. Revisa la consola.`);
        }
    };

    const handleCancel = () => {
        setProductoEditado({
            id: null,
            nombre: '',
            precio: '',
            descripcion: '',
            categoria: '',
            oferta: false,
            precioOferta: 0, 
            imagen: null,
            imagenPreview: '',
            nombre_modificado: '',
            fecha_modificacion: ''
        });
        setEditando(false);
    };


    const handleDelete = async (id, nombre) => {
        if (window.confirm(`¿Estás seguro de que quieres eliminar la comida "${nombre}"?`)) {
            try {
                await ComidaService.delete(id, rutUsuario);
                alert(`Comida "${nombre}" eliminada con éxito.`);
                loadComidas();
            } catch (error) {
                console.error("Error al eliminar la comida:", error);
                alert("Error al eliminar la comida. Revisa el backend.");
            }
        }
    };

    return (

        <>

            <div className="container">

                <div className="form-container">
                    <h2>{editando ? 'Editar Comida' : 'Agregar Comida'}</h2>
                    <form onSubmit={handleSubmit}>

                        <input
                            name="nombre"
                            type="text"
                            value={productoEditado.nombre}
                            onChange={handleChange}
                            placeholder="Nombre del producto"
                            required
                        />
                        <input
                            name="precio"
                            type="number"
                            value={productoEditado.precio}
                            onChange={handleChange}
                            placeholder="Precio del producto"
                            required
                            min={1}          
                            max={500000}     
                        />
                        <input
                            name="descripcion"
                            type="text"
                            value={productoEditado.descripcion}
                            onChange={handleChange}
                            placeholder="Descripción"
                            required
                        />
                        <label>Tipo de Comida:</label>
                            <select
                                name="categoria"
                                value={productoEditado.categoria}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecciona una categoría</option>
                                <option value="pizza">Pizza</option>
                                <option value="hamburguesa">Hamburguesa</option>
                                <option value="acompañante">Acompañante</option>
                                <option value="bebida">Bebida</option>
                                <option value="postre">Postre</option>
                            </select>

   
                        <label>
                            En Oferta:
                            <input
                                name="oferta"
                                type="checkbox"
                                checked={productoEditado.oferta}
                                onChange={handleChange}
                                
                            />
                        </label>

                        <label htmlFor="precioOferta">Precio de Oferta:</label> 
                        <input
                            id="precioOferta"
                            name="precioOferta"
                            type="number"
                            step="0.01"
                            value={productoEditado.precioOferta}
                            onChange={handleChange}
                            placeholder="Precio de Oferta"
                            required={productoEditado.oferta}
                            min={1}          
                            max={500000} 
                        />

                         

                        <input
                            name="imagen"
                            type="file"
                            onChange={handleChange}
                        />

                        {productoEditado.imagenPreview && (
                            <img src={productoEditado.imagenPreview} alt="Vista previa" style={{ width: '150px' }} />
                        )}

                        <button type="submit">
                            {editando ? 'Guardar Cambios' : 'Agregar Producto'}
                        </button>

                        {editando && (
                            <button type="button" onClick={handleCancel}>Cancelar</button>
                        )}
                    </form>
                </div>

                <div className="product-list">
                    {comidas.map((producto) => (
                        <div key={producto.id} className="product-item">

                            <div className="product-details">
                                <p>Nombre: {producto.nombre}</p>
                                <p>Precio: {producto.precio}</p>
                                <p>Categoria: {producto.tipoComida}</p>
                                <p>Oferta: {producto.oferta ? 'Sí' : 'No'}</p>
                                {producto.oferta && <p>Precio Oferta: {producto.precioOferta}</p>}
                                <p>Descripcion: {producto.descripcion}</p> 
                            </div>

                            {producto.imagen && <img src={`http://localhost:8080/uploads/${producto.imagen}`} alt="Producto" style={{ width: '150px', height: 'auto' }} />}


                            <div className="product-actions">
                                <button onClick={() => handleEdit(producto)}>Editar</button>
                                <button onClick={() => handleDelete(producto.id, producto.nombre)}>Eliminar</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </>
  );
}

export default ComidaAdmin;