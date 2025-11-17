import React,{useEffect,useState} from 'react'; 
import carrusel2 from '../assets/images/carrusel2.jpg'
import { Link } from "react-router-dom";



export function Oferta() {

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
<div className="area_producto_oferta">
  <div className="contenido_producto_oferta">
     {productos.slice(0,2).map((producto)=>( 
    <div className="producto_producto_oferta">
 
      <div className="imagen_producto_oferta">
        
        <img src={producto.img_oferta} alt="Burger President" />
        <div className="descripcion_producto_oferta">
          <div className="texto_producto_oferta">
             
            
            <h3 className='txt_producto_oferta'>{producto.nombre}</h3>
            <span classname="txt_producto_oferta">ANTES $<del>{producto.precio}<del /></del></span><br />
            <span className='txt_producto_oferta'>AHORA ${producto.precio_oferta}</span>
            <p className='txt_producto_oferta'>{producto.descripcion}</p>
            
    
          <Link to={`/producto/${producto.id}`}className=" btn-comprar btn btn-danger">ver producto</Link>
          </div>
        </div>
      </div>
 
    </div>
   ))}
  
  </div>
</div>
</>
 
     );
    }











export function TodasOfertas() {

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
<section className="seccion_comida relleno_diseño_inferior">
    <div className="container">
      <h1>Ofertas</h1>
      <div className="contenido_filtro">
        <div className="row grid">

          {productos.map((producto)=>( 
          <div className="col-sm-7 col-lg-4 all">
            <div className="card" style={{width: '18rem', marginTop: 8}}>
              <img src={producto.img} className="img_carta" alt={producto.nombre} />
              <div className="card-body">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text">{producto.descripcion}</p>
                <p classname="card-text">ANTES $<del>{producto.precio}<del> </del></del></p>

                <p className="card-text">AHORA ${producto.precio_oferta}</p>
                <Link to={`/producto/${producto.id}`}className="btn btn-danger mr-3">ver producto</Link>
                                <button  onClick={()=>alert("pedido")}  className="btn btn-danger">Pedir</button>
              </div>
            </div>
          </div>
           ))}
           
        </div>
      </div>
     
    </div>
  </section>
</>
 
     );
    }    
   
 

   
