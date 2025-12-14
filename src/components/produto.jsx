import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import ComidaService from "../service/ComidaService";
import {agregarAlCarrito}  from '../assets/js/agregarCarrito';
import barraLateral from "../components/barraLateral";


function Producto() {
  const { id } = useParams();   
  const [producto, setProducto] = useState([]); 
  const tipo_complejo = ["pizza", "hamburguesa", "burrito"];
   
  const [barraLateralAbierta, setbarraLateralAbierta] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null); 

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
        navigate('/error');
      }finally{
        navigate('/error');
      }
    };

    cargarProducto();
  }, [id]);

  if (!producto) {
    return <div>Cargando producto...</div>;
  }

  const pedirProducto = async (producto) => {
    console.log("TIPO:", producto.tipoComida);

    if (tipo_complejo.includes(producto.tipoComida?.toLowerCase())) {
      
      setProductoSeleccionado(producto); 
      setbarraLateralAbierta(true);
    } else {
      agregarAlCarrito(producto); 
    }
  };

  const IMAGEN_BASE_URL = "http://98.95.19.168:8080/uploads/";
               
  const imgDefault = "/src/assets/images/f1.png";

  return (
    
    <div className="vistaProducto">
      <barraLateral
              open={barraLateralAbierta}
              onClose={() => setbarraLateralAbierta(false)}
              product={productoSeleccionado}
              onConfirm={(detalle) => {
                alert("producto agregado al carrito")
                setbarraLateralAbierta(false);
              }}
            />
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
         
        <button onClick={() => pedirProducto(producto)} className="btn btn-danger mt-1 mr-3">
        Pedir</button>


        </div>
      </div>
    </div>
  );
}

export default Producto;
