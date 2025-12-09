
 
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react'; 
import { Link, Navigate } from 'react-router-dom';

import   historial    from '../components/Historial';

function Carrito() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState(() => {

    try {
      const guardado = localStorage.getItem("carrito");
      return guardado ? JSON.parse(guardado) : [];
    } catch (e) {
      console.error("Error leyendo carrito de localStorage", e);
      return [];

    }

  });


  const [mensaje, setMensaje] = useState("");

 

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(productos));
  }, [productos]);



  const eliminarProducto = (id) => {
    const nuevoCarrito = productos.filter((p) => p.id !== id);
    setProductos(nuevoCarrito);
    alert("Producto eliminado");

  };



  const cambiarCantidad = (id, nuevaCantidad) => {
    const n = Math.max(1, Math.min(10, parseInt(nuevaCantidad || "1", 10)));
    const actualizado = productos.map((p) =>
      p.id === id ? { ...p, cantidad: n } : p
    );
    setProductos(actualizado);

  };



  const totalProductos = productos.reduce((acc, p) => acc + p.cantidad, 0);
  const totalPagar = productos.reduce(
    (acc, p) => acc + p.precio * p.cantidad,
    0
  );

  const irAPago = () => {
    if (productos.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
    navigate("/pago", { state: { items: productos, total: totalPagar } });
  };


  const IMAGEN_BASE_URL = "http://localhost:8080/uploads/";
  const IMG_DEFAULT = "/src/assets/images/f1.png"
  return (
    <>
      <div className="container mt-4">
        {mensaje && (
          <div className="alert alert-warning text-center" role="alert">
            {mensaje}
          </div>
        )}
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <h2>Carrito de compras</h2>
              </div>
              <div className="card-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th>img</th>
                      <th>producto</th>
                      <th>precio</th>
                      <th>cantidad</th>
                      <th>total</th>
                      <th>eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No hay productos en el carrito
                        </td>
                      </tr>
                    ) : (
                      productos.map((p) => (
                        <tr key={p.id}>
                          <td data-label="img">
                            <img
                                src={ p.imagen  ? `${IMAGEN_BASE_URL}${p.imagen}` : (p.img ? p.img : IMG_DEFAULT)    }
                                alt={p.nombre || "Producto"}style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: '5px' }}/>
                          </td>
                          <td data-label="producto">{p.nombre}</td>
                          <td data-label="precio">
                            ${p.precio.toLocaleString()}
                          </td>
                          <td data-label="cantidad">
                            <input
                              type="number"
                              className="form-control"
                              value={p.cantidad}
                              min={1}
                              max={10}
                              style={{ width: 80 }}
                              onChange={(e) =>
                                cambiarCantidad(p.id, e.target.value)
                              }
                            />
                          </td>
                          <td data-label="total">
                            ${(p.precio * p.cantidad).toLocaleString()}
                          </td>
                          <td data-label="eliminar">
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => eliminarProducto(p.id)}
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <h3>Resumen</h3>
              </div>
              <div className="card-body">
                <p>
                  <strong>Total productos</strong>: {totalProductos}
                </p>
                <p>
                  <strong>Total a pagar</strong>: $
                  {totalPagar.toLocaleString()}
                </p>
                <button
                  type="button"
                  className="btn btn-primary w-100"
                  onClick={irAPago}
                >
                  Proceder a pagar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
        <Link to='/historial' className="nav-link">Historial de compras</Link>
     </div>
     </div>
     </div>
     </div>
      </div>
    </>
  );
}

export default Carrito;