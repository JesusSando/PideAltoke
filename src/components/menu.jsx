import React, { useEffect ,useState} from 'react'; 

import data from '../assets/json/comida.json'
import PasarSeccionComida from '../assets/js/pasarSeccionComida';
import { Link } from "react-router-dom";

export function Menu() {



  const limite =4;

    const [productos, setProductos] = useState([]);

   useEffect(()=>{
    const cargarComida=async()=>{
      const res=await fetch('/json/comida.json');
    if(!res.ok){
        throw new Error ('Error al cargar los usuarios');
    }
    const data = await res.json();
    setProductos(data);
};
  cargarComida();
   },[]);

    return (
        <section className="seccion_comida relleno_diseño_inferior">
    <div className="container">
      <h2>Menú</h2>
      <div className="contenido_filtro">
        <div className="row grid">

          {productos.slice(0,limite).map((producto)=>( 
          <div className="col-sm-7 col-lg-4 all">
            <div className="card" style={{width: '18rem', marginTop: 8}}>
              <img src={producto.img} className="img_carta" alt={producto.nombre} />
              <div className="card-body">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text">{producto.descripcion}</p>
                <p className="card-text">${producto.precio}</p>
                <Link to={`/producto/${producto.id}`}className="btn btn-danger">ver producto</Link>
              </div>
            </div>
          </div>
           ))}
           
        </div>
      </div>
      <div className="boton-caja">
        <Link to="/pedirmenu" className="btn btn-danger">Ver más</Link>
      </div>
    </div>
  </section>
    );
}

export function PedirMenu(){
  useEffect(()=>{
    PasarSeccionComida()
  },[]);

  return(
    <section className="seccion_comida relleno_diseño_inferior">
  <div className="container">
    <div className="contenido_titulo encabezado_centro">
      <h2>
        Menú
      </h2>
    </div>
    <ul className="filtro_menu">
      <li className="active" data-filter="*">Todo</li>
      <li data-filter=".hamburguesas">Hamburguesas</li>
      <li data-filter=".pizza">Pizzas</li>
      <li data-filter=".pasta">Pastas</li>
      <li data-filter=".papas">Papas fritas</li>
    </ul>
    <div className="contenido_filtro">
      <div className="row grid">

         {data.map((producto)=>( 
          <div className={`col-sm-7 col-lg-4 all ${producto.categoria}`}>
            <div className="card" style={{width: '18rem', marginTop: 8}}>
              <img src={producto.img} className="img_carta" alt={producto.nombre} />
              <div className="card-body">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text">{producto.descripcion}</p>
                <p className="card-text">${producto.precio}</p>
                <Link to={`/producto/${producto.id}`}className="btn btn-danger">ver producto</Link>
              </div>
            </div>
          </div>
           ))}
         
   
      
      </div>
    </div>
  </div>
</section>

  );
}


