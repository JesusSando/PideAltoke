import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import ComidaService from "../service/ComidaService";


function Producto() {
  const { id } = useParams();   
  const [producto, setProducto] = useState(null);

useEffect(() => {
    const cargarProducto = async () => {
      try {
        const res = await ComidaService.getAll();
        const data = res.data;

        const encontrado = data.find(
          (prod) => prod.id === parseInt(id)
        );

        setProducto(encontrado);
      } catch (error) {
        console.error("  error al cargar el producto:", error);
      }
    };

    cargarProducto();
  }, [id]);

  if (!producto) {
    return <div>Cargando producto...</div>;
  }

  const IMAGEN_BASE_URL = "http://localhost:8080/uploads/";
               
    const imgDefault = "/src/assets/images/f1.png";

  return (
    <div className="vistaProducto">
      <div className="ropaPrincipal"> 
              <img  src={producto.imagen ? `${IMAGEN_BASE_URL}${producto.imagen}` : imgDefault} 
                  alt={producto.nombre}   />
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
