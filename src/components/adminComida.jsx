 
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
    });
    setEditando(true);  
  };

  // Función que maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, files } = e.target; // Extraemos los valores del evento
    if (name === 'imagen' && files.length > 0) {
      // Si el campo es de tipo 'file', se actualiza la imagen y su vista previa
      setProductoEditado({
        ...productoEditado,
        imagen: files[0],
        imagenPreview: URL.createObjectURL(files[0]), // Crear una vista previa de la imagen seleccionada
      });
    } else {
      // Si es cualquier otro campo, solo actualizamos el valor
      setProductoEditado({
        ...productoEditado,
        [name]: value,
      });
    }
  };

  // Función para manejar el envío del formulario (agregar o editar el producto)
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue al enviar el formulario
    console.log(editando ? 'Producto editado:' : 'Nuevo producto agregado:', productoEditado);
    
    // Reseteamos el formulario después de agregar o editar
    setProductoEditado({
      id: null,
      nombre: '',
      precio: '',
      descripcion: '',
      categoria: '',
      imagen: null,
      imagenPreview: '',
    });
    setEditando(false); // Regresamos el formulario a estado "agregar" (no editar)
  };

  // Función para cancelar la edición y limpiar el formulario
  const handleCancel = () => {
    setProductoEditado({
      id: null,
      nombre: '',
      precio: '',
      descripcion: '',
      categoria: '',
      imagen: null,
      imagenPreview: '',
    });
    setEditando(false); // Cambiar estado a "no editando"
  };

  return (

<> 
      
     <div className="container">
      {/* Formulario de edición o creación de productos */}
      <div className="form-container">
        <h2>{editando ? 'Editar Comida' : 'Agregar Comida'}</h2>
        <form onSubmit={handleSubmit}>
          {/* Campos del formulario */}
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
          {/* Campo de imagen */}
          <input
            name="imagen"
            type="file"
            onChange={handleChange}
          />
          {/* Si hay una imagen seleccionada, mostrar la vista previa */}
          {productoEditado.imagenPreview && (
            <img src={productoEditado.imagenPreview} alt="Vista previa" style={{width:'150px'}} />
          )}
          {/* Botón para enviar el formulario */}
          <button type="submit">
            {editando ? 'Guardar Cambios' : 'Agregar Producto'}
          </button>
          {/* Botón para cancelar la edición */}
          {editando && (
            <button type="button" onClick={handleCancel}>Cancelar</button>
          )}
        </form>
      </div>

      {/* Lista de productos */}
      <div className="product-list">
        {data.map((producto) => (
          <div key={producto.id} className="product-item">
            {/* Detalles del producto */}
            <div className="product-details">
              <p>Nombre: {producto.nombre}</p>
              <p>Precio: {producto.precio}</p>
              <p>Categoria: {producto.categoria}</p>
              <p>Descripcion: {producto.descripcion}</p>
            </div>
            {/* Mostrar la imagen del producto si existe */}
            {producto.img && <img src={producto.img} alt="Producto" style={{width:'150px', height:'auto'}}/>}
           

            {/* Botones de acción (editar y eliminar) */}
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