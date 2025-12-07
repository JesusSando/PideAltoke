import { useEffect, useState } from "react";
import ComidaService from "../service/ComidaService";
import { Link } from "react-router-dom";
import PasarSeccionComida from '../assets/js/pasarSeccionComida';
import {agregarAlCarrito}  from '../assets/js/agregarCarrito';
    
import CustomizeSidebar from "../components/CustomizeSidebar";


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

                    <button onClick={() => pedirProducto(producto)} className="btn btn-danger">
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
  const [filtroActivo, setFiltroActivo] = useState("*");

  // PANEL LATERAL
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [personalizacionData, setPersonalizacionData] = useState(null);

  const IMAGEN_BASE_URL = "http://localhost:8080/uploads/";
  const imgDefault = "/src/assets/images/f1.png";

  useEffect(() => {
    PasarSeccionComida();

    const cargar = async () => {
      const res = await ComidaService.getAll();
      setProductos(res.data);
    };
    cargar();
  }, []);

  // Cuando hago click en PEDIR
  const pedirProducto = async (producto) => {
    console.log("TIPO:", producto.tipoComida);

    if (producto.tipoComida === "pizza") {
      const res = await fetch("/json/pizza.json");
      const data = await res.json();

      setProductoSeleccionado(producto);
      setPersonalizacionData(data);
      setSidebarOpen(true);
    } else {
      agregarAlCarrito(producto);
    }
  };

  const manejarFiltro = (filtro) => setFiltroActivo(filtro);

  const productosFiltrados =
    filtroActivo === "*"
      ? productos
      : productos.filter(
          (p) =>
            p.tipoComida &&
            "." + p.tipoComida.toLowerCase() === filtroActivo
        );

  return (
    <section className="seccion_comida relleno_diseño_inferior">
      {/* 🔵 SIDEBAR PERSONALIZACIÓN */}
      <CustomizeSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        product={productoSeleccionado}
        data={personalizacionData}
        onConfirm={(detalle) => {
          console.log("Pizza Lista:", detalle);

          agregarAlCarrito(detalle); // se almacena pizza + extras
          setSidebarOpen(false);
        }}
      />

      {/* 🟦 MENÚ */}
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
          <li className={filtroActivo === ".bebida" ? "active" : ""} onClick={() => manejarFiltro(".bebida")}>
            Bebidas
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

                  <button onClick={() => pedirProducto(p)} className="btn btn-danger mt-2">
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