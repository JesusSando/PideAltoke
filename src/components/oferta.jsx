import React,{useEffect,useState} from 'react'; 
import carrusel2 from '../assets/images/carrusel2.jpg'
import { Link } from "react-router-dom";


import ComidaService from "../service/ComidaService";


export function Oferta() {

  const limite = 4;
    const [productos, setProductos] = useState([]);
  
    useEffect(() => {
      const cargarComida = async () => {
        try {
          const res = await ComidaService.getAll();
          setProductos(res.data);
        } catch (error) {
          console.error("Error al cargar las comidas:", error);
        }
      };
      cargarComida();
    }, []);

    const imgDefault = "/src/assets/images/carrusel5.jpg";
   
    return (
 <> 
<div className="area_producto_oferta">
  <div className="contenido_producto_oferta">
     {productos.slice(0,2).map((producto)=>( 
    <div className="producto_producto_oferta">
 
      <div className="imagen_producto_oferta">
        
         <img src={producto.img_oferta || imgDefault} alt={producto.nombre} />
        <div className="descripcion_producto_oferta">
          <div className="texto_producto_oferta">
             
            
            <h3 className='txt_producto_oferta'>{producto.nombre}</h3>
            <span classname="txt_producto_oferta">ANTES $<del>{producto.precio}<del /></del></span><br />
            <span className='txt_producto_oferta'>AHORA ${producto.precioOferta}</span>
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
  
    useEffect(() => {
      const cargarComida = async () => {
        try {
          const res = await ComidaService.getAll();
          setProductos(res.data);
        } catch (error) {
          console.error("Error al cargar las comidas:", error);
        }
      };
      cargarComida();
    }, []);

    const imgDefault = "/src/assets/images/f1.png";

   const productosEnOferta = productos.filter(p => p.oferta);
    return (
 <> 
 
<section className="seccion_comida relleno_diseño_inferior">
    <div className="container">
      <h1>Ofertas</h1>
      <div className="contenido_filtro">
        <div className="row grid">

          {productosEnOferta.map((producto)=>( 
          <div className="col-sm-7 col-lg-4 all">
            <div className="card" style={{width: '18rem', marginTop: 8}}>
              <img src={producto.img_oferta || imgDefault} alt={producto.nombre} />
              <div className="card-body">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text">{producto.descripcion}</p>
                   {producto.oferta ? 
                        <> <span className="text-danger">Ahora:${producto.precioOferta}</span> <br /><s>Antes:${producto.precio}</s> </> :
                        <></>
                      } <br />

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
   
 

   
