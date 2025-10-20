import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const IVA = 0.19;

function Boleta() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const productos = Array.isArray(state?.productos) ? state.productos : [];
  const metodoPago = state?.metodoPago || "Tarjeta de Débito";
  const comprador = state?.comprador || { nombre: "Cliente", Ultimos4: "****" };

  const total = useMemo(
    () => productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0),
    [productos]
  );
  
  const neto = state?.totales?.neto ?? Math.round(total / (1 + IVA));
  const iva = state?.totales?.iva ?? (total - neto);

  
  if (!state || productos.length === 0) {
    return (
      <div className="container py-5">
        <div className="alert alert-info">
          No encontramos una orden reciente.
          <button className="btn btn-link p-0 ms-2" onClick={() => navigate("/carrito")}>
            Volver al carrito
          </button>
        </div>
      </div>
    );
  }

  const fecha = new Date().toLocaleString("es-CL");

  return (
    <section className="seccion_boleta relleno_diseño_inferior">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="mb-0">Boleta electrónica</h2>
          <small className="text-muted">{fecha}</small>
        </div>

        <div className="mb-3">
          <div><strong>Cliente:</strong> {comprador.nombre}</div>
          <div><strong>Método de pago:</strong> {metodoPago} • **** {comprador.Ultimos4}</div>
        </div>

        <div className="card mb-3">
          <div className="card-header">
            <h5 className="mb-0">Detalle de la compra</h5>
          </div>
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th className="text-end">Precio unit.</th>
                  <th className="text-end">Cantidad</th>
                  <th className="text-end">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((p) => (
                  <tr key={p.id}>
                    <td>{p.nombre}</td>
                    <td className="text-end">${p.precio.toLocaleString()}</td>
                    <td className="text-end">{p.cantidad}</td>
                    <td className="text-end">
                      ${(p.precio * p.cantidad).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan={3} className="text-end">Neto</th>
                  <th className="text-end">${neto.toLocaleString()}</th>
                </tr>
                <tr>
                  <th colSpan={3} className="text-end">IVA (19%)</th>
                  <th className="text-end">${iva.toLocaleString()}</th>
                </tr>
                <tr>
                  <th colSpan={3} className="text-end fs-5">Total</th>
                  <th className="text-end fs-5">${(neto + iva).toLocaleString()}</th>
                </tr>
              </tfoot>
            </table>

            <div className="alert alert-success mt-3 mb-0">
              ¡Compra confirmada! Gracias por tu pedido 🙌
            </div>
          </div>
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Ir al inicio
          </button>
          <button className="btn btn-outline-secondary" onClick={() => navigate("/carrito")}>
            Volver al carrito
          </button>
        </div>
      </div>
    </section>
  );
}

export default Boleta;
