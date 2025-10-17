import React, { useState } from "react";

function Carrito() {
  const [productos, setProductos] = useState([
    { id: 1, nombre: "Hamburguesa grande", precio: 9990, cantidad: 1, img: "images/f2.png" },
    { id: 2, nombre: "Hamburguesa pollo rostizado", precio: 7990, cantidad: 1, img: "images/f8.png" },
  ]);

  const [mensaje, setMensaje] = useState("");

  const eliminarProducto = (id) => {
    const producto = productos.find((p) => p.id === id);
    setProductos(productos.filter((p) => p.id !== id));
    setMensaje(`${producto.nombre} fue eliminado del carrito`);
  };


  const cambiarCantidad = (id, nuevaCantidad) => {
    setProductos(
      productos.map((p) =>
        p.id === id ? { ...p, cantidad: parseInt(nuevaCantidad) } : p
      )
    );
  };

  const totalProductos = productos.reduce((acc, p) => acc + p.cantidad, 0);
  const totalPagar = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  return (
    <div className="container mt-4">
      {/* mensaje condicional */}
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
                  {productos.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <img src={p.img} alt={p.nombre} style={{ width: 60 }} />
                      </td>
                      <td>{p.nombre}</td>
                      <td>${p.precio.toLocaleString()}</td>
                      <td>
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
                      <td>${(p.precio * p.cantidad).toLocaleString()}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => eliminarProducto(p.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                  {productos.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No hay productos en el carrito
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Resumen */}
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
              <button className="btn btn-primary w-100">
                Proceder a pagar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carrito;
