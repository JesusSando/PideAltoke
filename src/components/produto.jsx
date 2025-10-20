import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Producto() {
  const { id } = useParams();   
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const cargarProducto = async () => {
      const res = await fetch('/json/comida.json');
      if (!res.ok) {
        throw new Error('Error al cargar el producto');
      }
      const data = await res.json();
      const productoEncontrado = data.find((prod) => prod.id === parseInt(id));  
      setProducto(productoEncontrado);
    };

    cargarProducto();
  }, [id]);

  if (!producto) {
    return <div>Cargando producto...</div>;
  }

  return (
    <div className="vistaProducto">
      <div className="ropaPrincipal">
        <img src={producto.img} alt={producto.nombre} className="principalImg" />
      </div>
      <div className="textoVistaProducto">
        <h1>{producto.nombre}</h1>
        <p>{producto.descripcion}</p>
        <div className="titulosProductos">
          <h2>${producto.precio}</h2>
        </div>
        <div className="botonVista">
         
                <button  onClick={()=>alert("pedido")}  className="btn btn-danger">Pedir</button>
        </div>
      </div>
    </div>
  );
}

export default Producto;
