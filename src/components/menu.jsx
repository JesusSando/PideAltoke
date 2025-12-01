import { useEffect, useState } from "react";
import ComidaService from "../service/ComidaService";
import { Link } from "react-router-dom";
import PasarSeccionComida from '../assets/js/pasarSeccionComida';
import {agregarAlCarrito}  from '../assets/js/agregarCarrito';

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


  const IMAGEN_BASE_URL = "http://localhost:8080/uploads/";
  const imgDefault = "/src/assets/images/f1.png";

  return (
    <section className="seccion_comida relleno_diseño_inferior" id='menu'>
      <div className="container">
        <h2 className='menuTitulo'>Menú</h2>
        <div className="contenido_filtro">
          <div className="row grid">
            {productos.slice(0, limite).map(producto => (
              <div className={`col-sm-7 col-lg-4 all ${producto.tipoComida ? producto.tipoComida.toLowerCase() : ''}`} key={producto.id}>
                <div className="card" style={{ width: '18rem', marginTop: 8 }}>
                  
                    <img 
                    src={producto.imagen ? `${IMAGEN_BASE_URL}${producto.imagen}` : imgDefault} 
                    alt={producto.nombre} 
                  />

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

                    <button onClick={() => agregarAlCarrito(producto)}  className="btn btn-danger">
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


  

  const [productos, setProductos] = useState([]);
  const [filtroActivo, setFiltroActivo] = useState('*');

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

 
    const manejarFiltro = (filtro) => { 
        setFiltroActivo(filtro);
 
        const listaItems = document.querySelectorAll('.filtro_menu li');
        listaItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-filter') === filtro) {
                item.classList.add('active');
            }
        });
    }; 
    const productosFiltrados = productos.filter(producto => { 
        if (filtroActivo === '*') {
            return true;
        } 
        const tipoEsperado = filtroActivo.substring(1);  
        return producto.tipoComida && producto.tipoComida.toLowerCase() === tipoEsperado;
    });


const IMAGEN_BASE_URL = "http://localhost:8080/uploads/";
  const imgDefault = "/src/assets/images/f1.png";


  return (
    <section className="seccion_comida relleno_diseño_inferior">
      <div className="container">

        <h2 className='menuTitulo'>Menú</h2>

        <ul className="filtro_menu">
          <li className={filtroActivo === '*' ? 'active' : ''} data-filter="*" onClick={() => manejarFiltro('*')}>Todo</li>
                    <li className={filtroActivo === '.hamburguesa' ? 'active' : ''} data-filter=".hamburguesa" onClick={() => manejarFiltro('.hamburguesa')}>Hamburguesas</li>
                    <li className={filtroActivo === '.pizza' ? 'active' : ''} data-filter=".pizza" onClick={() => manejarFiltro('.pizza')}>Pizzas</li>
                    <li className={filtroActivo === '.bebida' ? 'active' : ''} data-filter=".bebida" onClick={() => manejarFiltro('.bebida')}>Bebidas</li>

        </ul>

        <div className="contenido_filtro">
          <div className="row grid">

            {productos.map(producto => (
              <div className={`col-sm-7 col-lg-4 all ${producto.tipoComida ? producto.tipoComida.toLowerCase() : ''}`} key={producto.id}>
                <div className="card" style={{ width: '18rem', marginTop: 8 }}>

                 
                  <img src={producto.imagen ? `${IMAGEN_BASE_URL}${producto.imagen}` : imgDefault} 
                      alt={producto.nombre}/>

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
                    <button onClick={() => agregarAlCarrito(producto)}  className="btn btn-danger">
                        Pedir
                    </button>
                  </div>

                </div>
              </div>
            ))}

          </div>

               {productosFiltrados.length === 0 && (
                        <div className="alert   text-center mt-4">
                            No hay productos en la categoría seleccionada.
                        </div> 
                )}
        </div>

      </div>
    </section>
  );
}

