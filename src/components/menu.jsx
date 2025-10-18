import React, { useEffect } from "react";
import data from "../assets/json/comida.json";
import PasarSeccionComida from "../assets/js/pasarSeccionComida";
import { Link } from "react-router-dom";

/**
 * Mapea TODAS las imágenes en src/assets/images/** a URLs finales (Vite)
 * - Funciona con nombres como "f2.png" o "pizzas/f2.png"
 * - También “arregla” rutas que vengan como "../assets/images/f2.png"
 */
const images = import.meta.glob("/src/assets/images/**", { eager: true, as: "url" });

const resolveImg = (imgPath) => {
  // Fallback por si falta imagen
  const FALLBACK = "/images/default.png"; // pon este archivo en public/images/default.png si quieres

  if (!imgPath) return FALLBACK;

  // Si ya es absoluta o externa, úsala tal cual
  if (imgPath.startsWith("http") || imgPath.startsWith("data:") || imgPath.startsWith("/")) {
    // Nota: si viene "/images/archivo.png" debe existir en public/images
    return imgPath;
  }

  // Normalizamos algunos formatos comunes que suelen venir en el JSON
  // 1) "../assets/images/archivo.ext" -> "archivo.ext"
  // 2) "images/archivo.ext" -> "archivo.ext"
  const normalized = imgPath
    .replace(/^(\.\.\/)+assets\/images\//, "") // quita ../assets/images/
    .replace(/^images\//, "");                 // quita images/

  // Intento 1: nombre directo en src/assets/images
  const key1 = `/src/assets/images/${normalized}`;
  if (images[key1]) return images[key1];

  // Intento 2: por si el JSON ya trae subcarpetas y la normalización no aplica
  const key2 = `/src/assets/images/${imgPath}`;
  if (images[key2]) return images[key2];

  // Como último recurso, intenta servirlo desde public/images si existe ahí
  return `/images/${normalized}`;
};

export function Menu() {
  const limite = 4;
  return (
    <section className="seccion_comida relleno_diseño_inferior">
      <div className="container">
        <h2>Menú</h2>
        <div className="contenido_filtro">
          <div className="row grid">
            {data.slice(0, limite).map((producto) => (
              <div className="col-sm-7 col-lg-4 all" key={producto.id}>
                <div className="card" style={{ width: "18rem", marginTop: 8 }}>
                  <img
                    src={resolveImg(producto.img)}
                    className="img_carta"
                    alt={producto.nombre}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{producto.nombre}</h5>
                    <p className="card-text">{producto.descripcion}</p>
                    <Link to="/carrito" className="btn btn-danger">
                      Pedir
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="boton-caja">
          <Link to="/pedirmenu" className="btn btn-danger">
            Ver más
          </Link>
        </div>
      </div>
    </section>
  );
}

export function PedirMenu() {
  useEffect(() => {
    PasarSeccionComida();
  }, []);

  return (
    <section className="seccion_comida relleno_diseño_inferior">
      <div className="container">
        <div className="contenido_titulo encabezado_centro">
          <h2>Menú</h2>
        </div>
        <ul className="filtro_menu">
          <li className="active" data-filter="*">
            Todo
          </li>
          <li data-filter=".hamburguesas">Hamburguesas</li>
          <li data-filter=".pizza">Pizzas</li>
          <li data-filter=".pasta">Pastas</li>
          <li data-filter=".papas">Papas fritas</li>
        </ul>
        <div className="contenido_filtro">
          <div className="row grid">
            {data.map((producto) => (
              <div
                className={`col-sm-7 col-lg-4 all ${producto.categoria}`}
                key={producto.id}
              >
                <div className="card" style={{ width: "18rem", marginTop: 8 }}>
                  <img
                    src={resolveImg(producto.img)}
                    className="img_carta"
                    alt={producto.nombre}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{producto.nombre}</h5>
                    <p className="card-text">{producto.descripcion}</p>
                    <Link to="/carrito" className="btn btn-danger">
                      Pedir
                    </Link>
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
