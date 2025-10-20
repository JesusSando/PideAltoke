 

import React, { useEffect ,useState} from 'react';
 

function AdminCuenta() {
 
  const [productoEditado, setProductoEditado] = useState({
    rut:'',
    nombre:'',
    correo: '',
    contraseña:'',
    cargo:'',
    comuna:''

  });

 
  const [editando, setEditando] = useState(false);

 
  const handleEdit = (producto) => {
 
    setProductoEditado({
      rut:producto.rut,
      nombre:producto.nombre,
    correo:producto.correo,
    contraseña:producto.contraseña,
    cargo:producto.cargo,
    comuna:producto.comuna
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
      rut:'',
      nombre:'',
    correo: '',
    contraseña:'',
    cargo:'',
    comuna:''
    });
    setEditando(false); 
  };

 
  const handleCancel = () => {
    setProductoEditado({
     rut:'',
     nombre:'',
    correo: '',
    contraseña:'',
    cargo:'',
    comuna:''
    });
    setEditando(false); 
  };




  const [productos, setProductos] = useState([]);
  
     useEffect(()=>{
      const cargarComida=async()=>{
        const res=await fetch('/json/usuarios.json');
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
        <h2>{editando ? 'Editar usuario' : 'Agregar usuario'}</h2>
        <form onSubmit={handleSubmit}>
 
          <input
            name="rut"
            type="text"
            value={productoEditado.rut}
            onChange={handleChange}
            placeholder="rut"
            required
          />
          <input
            name="nombre"
            type="text"
            value={productoEditado.nombre}
            onChange={handleChange}
            placeholder="nombre"
            required
          />
          <input
            name="correo"
            type="text"
            value={productoEditado.correo}
            onChange={handleChange}
            placeholder="correo"
            required
          />
          <input
            name="contraseña"
            type="text"
            value={productoEditado.contraseña}
            onChange={handleChange}
            placeholder="contraseña"
            required
          />
          <input
            name="comuna"
            type="text"
            value={productoEditado.comuna}
            onChange={handleChange}
            placeholder="comuna"
            required
          />

            <input
            name="cargo"
            type="text"
            value={productoEditado.cargo}
            onChange={handleChange}
            placeholder="cargo"
            required
          />
     
        

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
              <p>Rut: {producto.rut}</p>
              <p>Nombre: {producto.nombre}</p>
              <p>Correo:{producto.correo}</p>
              <p>Contraseña: {producto.contraseña}</p>
              <p>Cargo: {producto.cargo}</p>
               
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

export default AdminCuenta;