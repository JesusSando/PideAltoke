import { useEffect, useState } from "react";
import ComidaService from "../service/ComidaService";
import { Link } from "react-router-dom";
import PasarSeccionComida from '../assets/js/pasarSeccionComida';

export function Menu() {
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

  const imgDefault = "/src/assets/images/f1.png";

  return (
    <section className="seccion_comida relleno_diseño_inferior" id='menu'>
      <div className="container">
        <h2 className='menuTitulo'>Menú</h2>
        <div className="contenido_filtro">
          <div className="row grid">
            {productos.slice(0, limite).map(producto => (
              <div className={`col-sm-7 col-lg-4 all ${producto.tipoComida.toLowerCase()}`} key={producto.id}>
                <div className="card" style={{ width: '18rem', marginTop: 8 }}>
                  
                    <img src={producto.img_oferta || imgDefault} alt={producto.nombre} />

                  <div className="card-body">
                    <h5 className="card-title">{producto.nombre}</h5>
                    <p className="card-text">{producto.descripcion}</p>

            
                    {producto.oferta ? 
                        <> <span className="text-danger">Ahora:${producto.precioOferta}</span> <br /><s>Antes:${producto.precio}</s> </> :
                        <><span className="text-danger">Precio:${producto.precio}</span></>
                      } <br />

                    <Link to={`/producto/${producto.id}`} className="btn btn-danger mr-3">
                      Ver producto
                    </Link>

                    <button onClick={() => alert("pedido")} className="btn btn-danger">
                      Pedir
                    </button>
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





export function PedirMenu() {


  function agregarAlCarrito(producto) {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const existe = carrito.find(p => p.id === producto.id);

  if (existe) {
    existe.cantidad += 1;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.oferta ? producto.precioOferta : producto.precio,
      img: producto.img_oferta || producto.img || "/src/assets/images/f1.png",   
      cantidad: 1
    });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert("Producto agregado al carrito");
}

  const [productos, setProductos] = useState([]);

  useEffect(() => {
    PasarSeccionComida();
    
    const cargarComida = async () => {
      try {
        const res = await ComidaService.getAll();
        setProductos(res.data);
      } catch (error) {
        console.error("Error al cargar comidas:", error);
      }
    };

    cargarComida();
  }, []);





  const imgDefault = "/src/assets/images/f1.png";
  return (
    <section className="seccion_comida relleno_diseño_inferior">
      <div className="container">

        <h2 className='menuTitulo'>Menú</h2>

        <ul className="filtro_menu">
          <li className="active" data-filter="*">Todo</li>
          <li data-filter=".hamburguesa">Hamburguesas</li>
          <li data-filter=".pizza">Pizzas</li>
          <li data-filter=".bebida">Bebidas</li>

        </ul>

        <div className="contenido_filtro">
          <div className="row grid">

            {productos.map(producto => (
              <div className={`col-sm-7 col-lg-4 all ${producto.tipoComida.toLowerCase()}`} key={producto.id}>
                <div className="card" style={{ width: '18rem', marginTop: 8 }}>

                   <img src={producto.img_oferta || imgDefault} alt={producto.nombre} />

                  <div className="card-body">
                    <h5 className="card-title">{producto.nombre}</h5>
                    <p className="card-text">{producto.descripcion}</p>

                    <p className="card-text">
                          {producto.oferta ? 
                        <> <span className="text-danger">Ahora:${producto.precioOferta}</span> <br /><s>Antes:${producto.precio}</s> </> :
                        <><span className="text-danger">Precio:${producto.precio}</span></>
                      } <br />
                    </p>

                    <Link to={`/producto/${producto.id}`} className="btn btn-danger mr-3">Ver producto</Link>
                    <button
                      onClick={() => agregarAlCarrito({
                        ...producto,
                        precio: producto.oferta ? producto.precioOferta : producto.precio,
                        img: producto.img_oferta || producto.img
                      })}
                      className="btn btn-danger">
                      Pedir
                    </button>
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

