import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import f2 from "../assets/images/f2.png";
import f8 from "../assets/images/f8.png";

function Carrito() {
  const navigate = useNavigate();

  const [productos, setProductos] = useState([
    { id: 1, nombre: "Hamburguesa grande", precio: 9990, cantidad: 1, img: f2 },
    { id: 2, nombre: "Hamburguesa pollo rostizado", precio: 7990, cantidad: 1, img: f8 },
  ]);

  const [mensaje, setMensaje] = useState("");

  const eliminarProducto = (id) => {
    const producto = productos.find((p) => p.id === id);
    setProductos(productos.filter((p) => p.id !== id));
    setMensaje(`${producto.nombre} fue eliminado del carrito`);
  };

  const cambiarCantidad = (id, nuevaCantidad) => {
    const n = Math.max(1, Math.min(10, parseInt(nuevaCantidad || "1", 10)));
    setProductos(productos.map((p) => (p.id === id ? { ...p, cantidad: n } : p)));
  };

  const totalProductos = productos.reduce((acc, p) => acc + p.cantidad, 0);
  const totalPagar = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  const irAPago = () => {
    if (productos.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
    navigate("/pago", { state: { items: productos, total: totalPagar } });
  };

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
                            <img src={p.img} alt={p.nombre} style={{ width: 60 }} />
                          </td>
                          <td data-label="producto">{p.nombre}</td>
                          <td data-label="precio">${p.precio.toLocaleString()}</td>
                          <td data-label="cantidad">
                            <input
                              type="number"
                              className="form-control"
                              value={p.cantidad}
                              min={1}
                              max={10}
                              style={{ width: 80 }}
                              onChange={(e) => cambiarCantidad(p.id, e.target.value)}
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
                  <strong>Total a pagar</strong>: ${totalPagar.toLocaleString()}
                </p>

                <button type="button" className="btn btn-primary w-100" onClick={irAPago}>
                  Proceder a pagar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Carrito;
