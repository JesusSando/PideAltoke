import React,{useEffect,useState} from 'react'; 
import carrusel2 from '../assets/images/carrusel2.jpg'

function Oferta() {

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
    {productos.map((producto)=>( 
    <div className="producto_producto_oferta">
 
      <div className="imagen_producto_oferta">
        
        <img src={producto.img_oferta} alt="Burger President" />
        <div className="descripcion_producto_oferta">
          <div className="texto_producto_oferta">
            <span className='txt_producto_oferta'>$20</span>
            <h3 className='txt_producto_oferta'>El Burger Presidente</h3>
            <p className='txt_producto_oferta'>Excelente opción para darle confianza a tu negocio.</p>
            <a href="#" className="btn-comprar">Ordenar ahora</a>
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
   
export default Oferta;

   
