 
import React, { useEffect ,useState} from 'react';
import data from '../assets/json/comida.json';

function ComidaAdmin() {
 
  const [productoEditado, setProductoEditado] = useState({
    id: null,            
    nombre: '',           
    precio: '',       
    descripcion: '',       
    categoria: '',         
    imagen: null,          
    imagenPreview: '',     
    nombre_modificado:'',
     fecha_modificacion  :'' 
  });

 
  const [editando, setEditando] = useState(false);

 
  const handleEdit = (producto) => {
 
    setProductoEditado({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      descripcion: producto.descripcion,
      categoria: producto.categoria,
      imagen: producto.img || null,
      imagenPreview: producto.img || '',  
      nombre_modificado:producto.nombre_modificado,
     fecha_modificacion  :producto.fecha_modificacion
    });
    setEditando(true);  
  };


  const handleChange = (e) => {
    const { name, value, files } = e.target; 
    if (name === 'imagen' && files.length > 0) {
    
      setProductoEditado({
        ...productoEditado,
        imagen: files[0],
        imagenPreview: URL.createObjectURL(files[0]), 
      });
    } else {
      setProductoEditado({
        ...productoEditado,
        [name]: value,
      });
    }
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();  
    console.log(editando ? 'Producto editado:' : 'Nuevo producto agregado:', productoEditado);
    
    setProductoEditado({
      id: null,
      nombre: '',
      precio: '',
      descripcion: '',
      categoria: '',
      imagen: null,
      imagenPreview: '',
     nombre_modificado:'',
     fecha_modificacion  :'' 
    });
    setEditando(false);  
  };

 
  const handleCancel = () => {
    setProductoEditado({
      id: null,
      nombre: '',
      precio: '',
      descripcion: '',
      categoria: '',
      imagen: null,
      imagenPreview: '',
     nombre_modificado:'',
     fecha_modificacion  :'' 
    });
    setEditando(false);  
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
            type="text"
            value={productoEditado.precio}
            onChange={handleChange}
            placeholder="Precio del producto"
            required
          />
          <input
            name="descripcion"
            type="text"
            value={productoEditado.descripcion}
            onChange={handleChange}
            placeholder="Descripción"
            required
          />
          <input
            name="categoria"
            type="text"
            value={productoEditado.categoria}
            onChange={handleChange}
            placeholder="Categoría"
            required
          />

          <input
            name="nombre_modificado"
            type="text"
            value={productoEditado.nombre_modificado}
            onChange={handleChange}
            placeholder="Nombre del del ultimo modificador"
            required
          />

          <input
            name="fecha_modificacion"
            type="text"
            value={productoEditado.fecha_modificacion}
            onChange={handleChange}
            placeholder="Fecha de modificacion del producto"
            required
          /> 
 
          <input
            name="imagen"
            type="file"
            onChange={handleChange}
          />
 
          {productoEditado.imagenPreview && (
            <img src={productoEditado.imagenPreview} alt="Vista previa" style={{width:'150px'}} />
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
        {data.map((producto) => (
          <div key={producto.id} className="product-item">
 
            <div className="product-details">
              <p>Nombre: {producto.nombre}</p>
              <p>Precio: {producto.precio}</p>
              <p>Categoria: {producto.categoria}</p>
              <p>Descripcion: {producto.descripcion}</p>
              <p>Nombre ultimo moficador : {producto.nombre_modificado}</p>
              <p>Fecha de modificacion: {producto.fecha_modificacion}</p>
            </div>
 
            {producto.img && <img src={producto.img} alt="Producto" style={{width:'150px', height:'auto'}}/>}
           

 
            <div className="product-actions">
              <button onClick={() => handleEdit(producto)}>Editar</button>
              <button>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
 


    
    </>
  );
}

export default ComidaAdmin;