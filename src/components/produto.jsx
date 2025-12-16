import { useParams,Link } from 'react-router-dom';
import { useEffect, useState } from 'react'; 
import ComidaService from "../service/ComidaService";
import {agregarAlCarrito}  from '../assets/js/agregarCarrito';
import BarraLateral from "../components/barraLateral";


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
      <BarraLateral
              open={barraLateralAbierta}
              onClose={() => setbarraLateralAbierta(false)}
              product={productoSeleccionado}
              onConfirm={(detalle) => {
                setbarraLateralAbierta(false);
              }}
            />
      <div className="cartaPrincipal">  <img  src={producto.imagen ? `${IMAGEN_BASE_URL}${producto.imagen}` : imgDefault} 
                  alt={producto.nombre}   />
      </div>
      <div className="textoVistaProducto">
        <h1>{producto.nombre}</h1>
        <p>{producto.descripcion}</p>
        <div className="card bg-light border-0 shadow-sm mt-3">
        
        <div className="card-body ">
          <h2 className="card-title  fw-bold text-uppercase">
            Ingredientes
          </h2>
          <p className="card-text text-secondary mb-0 ">
            {producto.ingredientes}
          </p>
        </div>
      </div>

        <div className="titulosProductos mt-3" >
          <h2>Precio: ${producto.precio}</h2>
        </div>
        
        <div className="botonVista">
        
         
        <button onClick={() => pedirProducto(producto)} className="btn btn-danger mt-1 me-3 px-5" style={{ fontSize: "20px" }}>
        <strong>PEDIR</strong> </button>
        <div className="container ">
  <table className="table table-bordered text-center">
    <thead className="thead-light">

      
      <tr>
        <th>Nutrientes</th>
        <th>Cantidad</th>
      </tr>
    </thead>
    <tbody> 
      <tr>
        <td>Energia(Kcal)</td>
        <td>{producto.energia}Kcal</td>
      </tr> 
      <tr>
         
        <td>Colesterol(mg)</td>
        <td>{producto.colesterol}mg</td>
      </tr> 
      <tr>
        <td>Azucar(g)</td>
        <td>{producto.azucar}g</td>
      </tr> 
      <tr>
        <td>Sal(g)</td>
        <td>{producto.sal}g</td>
      </tr> 
      <tr>
        <td>Grasa(g)</td>
        <td>{producto.grasa}g</td>
      </tr>
       <tr>
        <td>Carbohidratos(g)</td>
        <td>{producto.carbohidratos}g</td>
      </tr>
       <tr>
        <td>Proteina(g)</td>
        <td>{producto.proteinas}g</td>
      </tr>
    </tbody>
  </table>
</div>


        </div>
      </div>
    </div>
  );
}

export default Producto;
