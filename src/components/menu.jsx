import { useEffect, useState } from "react";
import ComidaService from "../service/ComidaService";
import { Link } from "react-router-dom";
import PasarSeccionComida from '../assets/js/pasarSeccionComida';
import {agregarAlCarrito}  from '../assets/js/agregarCarrito';
    
import BarraLateral from "../components/barraLateral";


export function Menu() {
  const [productos, setProductos] = useState([]); 
  const tipo_complejo = ["pizza", "hamburguesa", "burrito"];
 
  const [barraLateralAbierta, setbarraLateralAbierta] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null); 
  const limite = 4; 

  useEffect(() => {
    const cargarComida = async () => {
      try {
        const res = await ComidaService.getAll();
        setProductos(res.data);
      } catch (error) {
        console.error("Error al cargar las comidas:", error);
        navigate('/error');
      }
    };
    cargarComida();
  }, []);

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
    <section className="seccion_comida relleno_diseño_inferior" id='menu'>
      <BarraLateral
        open={barraLateralAbierta}
        onClose={() => setbarraLateralAbierta(false)}
        product={productoSeleccionado}
        onConfirm={(detalle) => {
          alert("producto agregado al carrito")
          setbarraLateralAbierta(false);
        }}
      />
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

                    

                    <button onClick={() => pedirProducto(producto)} className="btn btn-danger mt-1 mr-3">
                    Pedir
                  </button>

                  <Link to={`/producto/${producto.id}`} className="btn btn-secondary mt-1 ">
                      Ver producto
                    </Link>
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
  const [filtroActivo, setFiltroActivo] = useState("*");
 
  const [barraLateralAbierta, setbarraLateralAbierta] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null); 

  const IMAGEN_BASE_URL = "http://98.95.19.168:8080/uploads/";
  const imgDefault = "/src/assets/images/f1.png";
  const tipo_complejo = ["pizza", "hamburguesa", "burrito"];

  useEffect(() => {
    PasarSeccionComida();

    const cargar = async () => {
      const res = await ComidaService.getAll();
      setProductos(res.data);
    };
    cargar();
  }, []);
 
  const pedirProducto = async (producto) => {
    console.log("TIPO:", producto.tipoComida);

    if (tipo_complejo.includes(producto.tipoComida?.toLowerCase())) {
      
      setProductoSeleccionado(producto); 
      setbarraLateralAbierta(true);
    } else {
      agregarAlCarrito(producto);
      alert("producto agregado al carrito")
    }
  };

  const manejarFiltro = (filtro) => setFiltroActivo(filtro);

  const productosFiltrados =
    filtroActivo === "*"
      ? productos
      : productos.filter((p) => p.tipoComida &&"." + p.tipoComida.toLowerCase() === filtroActivo);

  return (

    <section className="seccion_comida relleno_diseño_inferior">
  
      <BarraLateral
        open={barraLateralAbierta}
        onClose={() => setbarraLateralAbierta(false)}
        product={productoSeleccionado}
        onConfirm={(detalle) => {
          alert("producto agregado al carrito")
          setbarraLateralAbierta(false);
        }}
      />
 
      <div className="container">
        <h2 className="menuTitulo">Menú</h2>

        <ul className="filtro_menu">
          <li className={filtroActivo === "*" ? "active" : ""} onClick={() => manejarFiltro("*")}>
            Todo
          </li>
          <li className={filtroActivo === ".hamburguesa" ? "active" : ""} onClick={() => manejarFiltro(".hamburguesa")}>
            Hamburguesas
          </li>
          <li className={filtroActivo === ".pizza" ? "active" : ""} onClick={() => manejarFiltro(".pizza")}>
            Pizzas
          </li>
          <li className={filtroActivo === ".burrito" ? "active" : ""} onClick={() => manejarFiltro(".burrito")}>
            Burritos
          </li>
          <li className={filtroActivo === ".bebida" ? "active" : ""} onClick={() => manejarFiltro(".bebida")}>
            Bebidas
          </li>
    
          <li className={filtroActivo === ".acompañante" ? "active" : ""} onClick={() => manejarFiltro(".acompañante")}>
            Acompañamientos
          </li>
          <li className={filtroActivo === ".postre" ? "active" : ""} onClick={() => manejarFiltro(".postre")}>
            Postres
          </li>
        </ul>

        <div className="row grid">
          {productosFiltrados.map((p) => (
            <div key={p.id} className="col-sm-7 col-lg-4">
              <div className="card" style={{ width: "18rem", marginTop: 8 }}>
                <img
                  src={p.imagen ? `${IMAGEN_BASE_URL}${p.imagen}` : imgDefault}
                  alt={p.nombre}
                />

                <div className="card-body">
                  <h5 className="card-title">{p.nombre}</h5>
                  <p>{p.descripcion}</p>

                  {p.oferta ? (
                    <>
                      <span className="text-danger">Ahora: ${p.precioOferta}</span>
                      <br />
                      <s>Antes: ${p.precio}</s>
                    </>
                  ) : (
                    <span className="text-danger">Precio: ${p.precio}</span>
                  )}

                  <br />

                  

                    <button onClick={() => pedirProducto(p)} className="btn btn-danger mt-2  ms-2 mr-3">
                    Pedir
                  </button>

                  <Link to={`/producto/${p.id}`} className="btn btn-secondary mt-2 ms-2">
                    Ver
                  </Link>
                  
                </div>
              </div>
            </div>
          ))}
        </div>

        {productosFiltrados.length === 0 && (
          <div className="alert text-center mt-4">No hay productos en esta categoría.</div>
        )}
      </div>
    </section>
  );
}