 

import React, { useEffect ,useState} from 'react';
 

function AdminOferta() {
 
  const [productoEditado, setProductoEditado] = useState({
    id: null,            
    nombre: '',           
    precio: '',       
    precio_oferta:'',
    descripcion: '',       
    categoria: '',         
    imagen: null,         
    imagen_oferta: null,   
    imagenPreview: '',   

  });

 
  const [editando, setEditando] = useState(false);

 
  const handleEdit = (producto) => {
 
    setProductoEditado({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      precio_oferta: producto.precio_oferta,
      descripcion: producto.descripcion,
      categoria: producto.categoria,
      imagen: producto.imagen || null,
      imagen_oferta: producto.oferta || null,
      imagenPreview: producto.img || '',
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
      precio_oferta:'',
      descripcion: '',
      categoria: '',
      imagen: null,
      imagen_oferta: null,
      imagenPreview: '',
    });
    setEditando(false); 
  };

 
  const handleCancel = () => {
    setProductoEditado({
      id: null,
      nombre: '',
      precio: '',
      precio_oferta:'',
      descripcion: '',
      categoria: '',
      imagen: null,
      imagen_oferta: null,
      imagenPreview: '',
    });
    setEditando(false); 
  };




  const [productos, setProductos] = useState([]);
  
     useEffect(()=>{
      const cargarComida=async()=>{
        const res=await fetch('/json/oferta.json');
      if(!res.ok){
          throw new Error ('Error al cargar los usuarios');
      }
      const data = await res.json();
      setProductos(data);
  };
    cargarComida();
     },[]);

  return (

<> 
      
     <div className="container">

      <div className="form-container">
        <h2>{editando ? 'Editar Producto' : 'Agregar Producto'}</h2>
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
            name="precio"
            type="text"
            value={productoEditado.precio_oferta}
            onChange={handleChange}
            placeholder="Oferta del producto"
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
            name="imagen"
            type="file"
            onChange={handleChange}
          />

          {productoEditado.imagenPreview && (
            <img src={productoEditado.imagenPreview} alt="Vista previa" style={{width:'150px'}}/>
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
        {productos.map((producto) => (
          <div key={producto.id} className="product-item">

            <div className="product-details">
              <p>Nombre: {producto.nombre}</p>
              <p>Precio:{producto.precio}</p>
              <p>Precio Oferta: {producto.precio_oferta}</p>
              <p>Categoria: {producto.categoria}</p>
              <p>Descripcion: {producto.descripcion}</p>
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

export default AdminOferta;