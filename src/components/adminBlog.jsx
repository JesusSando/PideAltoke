 

import React, { useEffect ,useState} from 'react';
 

function AdminBlog() {
 
  const [productoEditado, setProductoEditado] = useState({
   id:'',
    fecha:'',
     titulo:'',
    descripcion_breve:'',
     descripcion:'',
     descripcion_destacada:'',
     imagen:null,
     autor:'',
     img_autor:null,
     frese:''

  });

 
  const [editando, setEditando] = useState(false);

 
  const handleEdit = (producto) => {
 
    setProductoEditado({
     id:producto.id,
    fecha:producto.fecha,
     titulo:producto.titulo,
    descripcion_breve:producto.descripcion_breve,
     descripcion:producto.descripcion,
     descripcion_destacada:producto.descripcion_destacada,
     imagen:producto.imagen || null,
     autor:producto.autor,
     img_autor:producto.img_autor || null,
     frese:producto.frese
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
     id:'',
    fecha:'',
     titulo:'',
    descripcion_breve:'',
     descripcion:'',
     descripcion_destacada:'',
     imagen:null,
     autor:'',
     img_autor:null,
     frese:''
    });
    setEditando(false); 
  };

 
  const handleCancel = () => {
    setProductoEditado({
        id:'',
    fecha:'',
     titulo:'',
    descripcion_breve:'',
     descripcion:'',
     descripcion_destacada:'',
     imagen:null,
     autor:'',
     img_autor:null,
     frese:''
    });
    setEditando(false); 
  };




  const [productos, setProductos] = useState([]);
  
     useEffect(()=>{
      const cargarComida=async()=>{
        const res=await fetch('/json/blog.json');
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
        <h2>{editando ? 'Editar Blog' : 'Agregar Blog'}</h2>
        <form onSubmit={handleSubmit}>
 
          <input
            name="fecha"
            type="text"
            value={productoEditado.fecha}
            onChange={handleChange}
            placeholder="Fecha"
            required
          />
          <input
            name="titulo"
            type="text"
            value={productoEditado.titulo}
            onChange={handleChange}
            placeholder="Titulo"
            required
          />
          <input
            name="descripcion_breve"
            type="text"
            value={productoEditado.descripcion_breve}
            onChange={handleChange}
            placeholder="Descripcion Breve"
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
            name="descripcion_destacada"
            type="text"
            value={productoEditado.descripcion_destacada}
            onChange={handleChange}
            placeholder="Descripción Destacada"
            required
          />
          <input
            name="autor"
            type="text"
            value={productoEditado.autor}
            onChange={handleChange}
            placeholder="Autor Nombre"
            required
          />
           <input
            name="frese"
            type="text"
            value={productoEditado.frese}
            onChange={handleChange}
            placeholder="Autor Frase"
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
              <p>fecha: {producto.fecha}</p>
              <p>Descripcion breve: {producto.descripcion_breve}</p>
              <p>descripcion: {producto.descripcion}</p>
              <p>Descripcion destacada: {producto.descripcion_destacada}</p>
              
              <p>Autor nombre: {producto.autor}</p>
            
              <p>Autor frase: {producto.frese}</p>
   
            </div>
             <p>Imagen</p>
            {producto.img && <img src={producto.img} alt="Producto" style={{width:'150px', height:'auto'}}/>}
          <br /><br />
             <p>Autor img</p>
            {producto.img && <img src={producto.img_autor} alt="Producto" style={{width:'150px', height:'auto'}}/>}
           <br /><br /> 


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

export default AdminBlog;