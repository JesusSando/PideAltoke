 
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
        ingredientes: '',
        fondoImg: null,       
        fondoImgPreview: '',   
        imagen: null,
        imagenPreview: '',
        nombre_modificado: '',
        fecha_modificacion: '',
        energia:'',
        grasa:'',
        colesterol:'',
        carbohidratos:'',
        azucar:'',
        proteinas:'',
        sal:''
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
            ingredientes: producto.ingredientes || '',
           fondoImgPreview: producto.fondoImg 
                ? `http://localhost:8080/uploads/${producto.fondoImg}` 
                : '',
            
            imagen: producto.imagen || null,
          
            imagenPreview: producto.imagen 
                ? `http://localhost:8080/uploads/${producto.imagen}` 
                : '', 
            
            nombre_modificado: producto.nombre_modificado,
            fecha_modificacion: producto.fecha_modificacion,
            energia:producto.energia ||0,
            grasa:producto.grasa ||0,
            colesterol:producto.colesterol ||0,
            carbohidratos:producto.carbohidratos ||0,
            azucar:producto.azucar ||0,
            proteinas:producto.proteinas ||0,
            sal:producto.sal ||0
        });
        setEditando(true);
    };


    const handleChange = (e) => {
        const { name, value, files, type, checked} = e.target; 
        if (name === 'fondoImg' && files.length > 0) {
    setProductoEditado({
        ...productoEditado,
        fondoImg: files[0],  
        fondoImgPreview: URL.createObjectURL(files[0]) 
    });
    return;
}

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
        formData.append('ingredientes', productoEditado.ingredientes);
        if (productoEditado.fondoImg instanceof File) {
            formData.append('fondoImg', productoEditado.fondoImg);
        }
        if (productoEditado.imagen && typeof productoEditado.imagen !== 'string') {
            formData.append('imagen', productoEditado.imagen);
        }
        
        formData.append('rutUsuario', rutUsuario);
        formData.append('energia', productoEditado.energia);
        formData.append('grasa', productoEditado.grasa);
        formData.append('colesterol', productoEditado.colesterol);
        formData.append('carbohidratos', productoEditado.carbohidratos);
        formData.append('azucar', productoEditado.azucar);
        formData.append('proteinas', productoEditado.proteinas);
        formData.append('sal', productoEditado.sal);

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
            fecha_modificacion: '',
            energia:'',
            grasa:'',
            colesterol:'',
            carbohidratos:'',
            azucar:'',
            proteinas:'',
            sal:''
        });
        setEditando(false);
    };


    const handleDelete = async (id, nombre) => {
        if (window.confirm(`¿Estás seguro de que quieres eliminar la comida "${nombre}"?`)) {
            try {
                await ComidaService.delete(id, rutUsuario);
                alert(`Comida "${nombre}" eliminada con exito.`);
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
                                <option value="">Selecciona una categoria</option>
                                <option value="pizza">Pizza</option>
                                <option value="hamburguesa">Hamburguesa</option>
                                <option value="burrito">Burrito</option>
                                <option value="acompañante">Acompañante</option>
                                <option value="bebida">Bebida</option>
                                <option value="postre">Postre</option>
                            </select>

   
                        <label> En Oferta:</label>
                         <input name="oferta" type="checkbox"checked={productoEditado.oferta}onChange={handleChange}/>
                        

                        <label htmlFor="precioOferta">Precio de Oferta:</label> 
                        <input  id="precioOferta" name="precioOferta" type="number"value={productoEditado.precioOferta}onChange={handleChange} placeholder="Precio de Oferta"required={productoEditado.oferta} min={0}   max={500000} />

                        <label>Ingredientes:</label>
                        <textarea name="ingredientes" value={productoEditado.ingredientes} onChange={handleChange} />

                        <label>Imagen Promocional (Fondo Oferta):</label>
                        <input name="fondoImg" type="file" onChange={handleChange} /> 
                        {productoEditado.fondoImgPreview && (
                            <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                                <p>Vista Previa Fondo:</p>
                                <img 
                                    src={productoEditado.fondoImgPreview} 
                                    alt="Vista previa fondo" 
                                    style={{ width: '200px', height: '100px', objectFit: 'cover', border: '1px solid #ccc', borderRadius: '5px' }} 
                                />
                            </div>
                        )}
 
                        <label>Imagen de la comida:</label>
                        <input name="imagen" type="file" onChange={handleChange}/>
                         
                        {productoEditado.imagenPreview && (
                            <img src={productoEditado.imagenPreview} alt="Vista previa" style={{ width: '150px' }} />
                        )}

                         <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'15px'}}>
                        <div>
                            <label>Energia (kcal):</label>
                            <input name="energia" type="number" min={0} max={50000}  step="0.01" value={productoEditado.energia} onChange={handleChange} placeholder="231" />
                        </div>
                        <div>
                            <label>Grasa (g):</label>
                            <input name="grasa" type="number" min={0} max={50000} step="0.01" value={productoEditado.grasa} onChange={handleChange} placeholder="11" />
                        </div>
                        <div>
                            <label>Colesterol (mg):</label>
                            <input name="colesterol" type="number" min={0} max={50000} step="0.01" value={productoEditado.colesterol} onChange={handleChange} placeholder="33.93" />
                        </div>
                        <div>
                            <label>Carbohidratos (g):</label>
                            <input name="carbohidratos" type="number" min={0} max={50000} step="0.01" value={productoEditado.carbohidratos} onChange={handleChange} placeholder="19" />
                        </div>
                        <div>
                            <label>Azucares (g):</label>
                            <input name="azucar" type="number" step="0.01" min={0} max={50000} value={productoEditado.azucar} onChange={handleChange} placeholder="4" />
                        </div>
                        <div>
                            <label>Proteinas (g):</label>
                            <input name="proteinas" type="number" min={0} max={50000} step="0.01" value={productoEditado.proteinas} onChange={handleChange} placeholder="12" />
                        </div>
                        <div>
                            <label>Sal (g):</label>
                            <input name="sal" type="number" step="0.01" min={0} max={50000} value={productoEditado.sal} onChange={handleChange} placeholder="1" />
                        </div>
                    </div>

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
                                <p>Oferta: {producto.oferta ? 'si' : 'no'}</p>
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