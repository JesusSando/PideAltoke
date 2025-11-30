import React, { useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { validarTarjeta } from "../assets/js/validarTarjeta";
import BoletaService from "../service/BoletaService";


const IVA = 0.19;

function Pago() {

    const navigate = useNavigate();
  const { state } = useLocation();

  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState(null);
 
  const productos = Array.isArray(state?.items) ? state.items : [];
  const total = state?.total || 0;
 
  const neto = useMemo(() => Math.round(total / (1 + IVA)), [total]);  
  const iva = useMemo(() => total - neto, [total]);  

  const [form, setForm] = useState({  
    nombre: "",
    numeroTarjeta: "",
    vencimiento: "",
    cvv: "",
  });

  useEffect(() => {
 
    const u = JSON.parse(localStorage.getItem("usuario"));
    
    if (!u) {
      alert("Debes iniciar sesión para realizar la compra.");
      navigate("/iniciarsesion");
    } else {
      setUsuario(u);
    }
    setLoading(false);  
  }, [navigate]);

  
  if (loading) { 
    return (
      <div className="container py-5 text-center">
        <h4>Cargando...</h4> 
      </div>
    );
  } 
  if (!usuario) {
      return (
          <div className="container py-5 text-center alert alert-warning">
              Redirigiendo al inicio de sesión...
          </div>
      );
  }

  
  const usuarioId = usuario.id;

  
 
  

  const handleChange = (e) => {
    const { name, value } = e.target;
 
    if (name === "numeroTarjeta") {
      const soloDigitos = value.replace(/\D/g, "").slice(0, 16);
      const conEspacios = soloDigitos.replace(/(.{4})/g, "$1 ").trim();
      setForm((f) => ({ ...f, [name]: conEspacios }));
      return;
    }
    if (name === "cvv") {
      const solo3 = value.replace(/\D/g, "").slice(0, 3);
      setForm((f) => ({ ...f, [name]: solo3 }));
      return;
    }
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validarFormulario = () => {
    const { nombre, numeroTarjeta, vencimiento, cvv } = form;

    if (!nombre.trim()) return "Ingresa el nombre del titular.";

    if (!validarTarjeta(numeroTarjeta)) {
      return "El número de tarjeta no es válido.";
    }

    if (!vencimiento) return "Selecciona el mes/año de vencimiento.";
    if (cvv.length !== 3) return "El CVV debe tener 3 dígitos.";

    const [anio, mes] = vencimiento.split("-").map((n) => parseInt(n, 10));
    const ahora = new Date();
    const ymActual = ahora.getFullYear() * 100 + (ahora.getMonth() + 1);
    const ymSeleccionado = anio * 100 + mes;
    if (ymSeleccionado < ymActual) return "La tarjeta está vencida.";

    if (productos.length === 0 || total <= 0) {
      return "Tu carrito está vacío. Vuelve al carrito para agregar productos.";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validarFormulario();
    if (error) {
      alert(error);
      return;
    }

    const items = productos.map((p) => ({
      comida: { id: p.id },
      cantidad: p.cantidad,
      precioUnitario: p.precio
    }));

    const data = {
      usuarioId,
      items,
      total
    };

    try {
      const res = await BoletaService.crearBoleta(data);

      const boletaGuardada = res.data;

      navigate("/boleta", {
        state: {
          productos,
          totales: { neto, iva, total },
          comprador: {
            nombre: form.nombre,
            Ultimos4: form.numeroTarjeta.replace(/\D/g, "").slice(-4)
          },
          metodoPago: "Tarjeta de Débito",
          boletaId: boletaGuardada.id
        }
      });

      localStorage.removeItem("carrito");

    } catch (err) {
      console.error("Error al guardar la boleta:", err);
      alert("Hubo un problema realizando la compra.");
    }
  };

  return (
    <section
      className="seccion_pago relleno_diseño_inferior"
      style={{ position: "relative" }}
    >
   

      <div className="container">
        <h2 className="text-center mb-4">Pago con Tarjeta de Débito</h2>

        <div className="row">
          {/* Resumen del pedido */}
          <div className="col-md-7 mb-4">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Resumen del pedido</h5>
              </div>
              <div className="card-body">
                {productos.length === 0 ? (
                  <p className="mb-0">Tu carrito está vacío.</p>
                ) : (
                  <>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>img</th>
                          <th>producto</th>
                          <th className="text-end">precio</th>
                          <th className="text-end">cantidad</th>
                          <th className="text-end">total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productos.map((p) => (
                          <tr key={p.id}>
                            <td>
                              <img
                                src={p.img}
                                alt={p.nombre}
                                style={{ width: 60 }}
                              />
                            </td>
                            <td>{p.nombre}</td>
                            <td className="text-end">
                              ${p.precio.toLocaleString()}
                            </td>
                            <td className="text-end">{p.cantidad}</td>
                            <td className="text-end">
                              ${(p.precio * p.cantidad).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="d-flex flex-column align-items-end">
                      <div>
                        <strong>Neto</strong>: ${neto.toLocaleString()}
                      </div>
                      <div>
                        <strong>IVA (19%)</strong>: ${iva.toLocaleString()}
                      </div>
                      <div className="fs-5">
                        <strong>Total a pagar</strong>: ${total.toLocaleString()}
                      </div>
                      <small className="text-muted mt-1">
                        * Los precios incluyen IVA (19% Chile).
                      </small>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="col-md-5 mb-4">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Datos de la tarjeta</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label className="form-label">Nombre del titular</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      placeholder="Ej: Juan Pérez"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Número de tarjeta</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      className="form-control"
                      name="numeroTarjeta"
                      value={form.numeroTarjeta}
                      onChange={handleChange}
                      placeholder="XXXX XXXX XXXX XXXX"
                      required
                    />
                  </div>

                  <div className="mb-3 d-flex gap-3">
                    <div className="flex-fill">
                      <label className="form-label">Vencimiento</label>
                      <input
                        type="month"
                        className="form-control"
                        name="vencimiento"
                        value={form.vencimiento}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div style={{ width: 120 }}>
                      <label className="form-label">CVV</label>
                      <input
                        type="password"
                        inputMode="numeric"
                        className="form-control"
                        name="cvv"
                        value={form.cvv}
                        onChange={handleChange}
                        placeholder="123"
                        maxLength={3}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-success w-100"
                    disabled={productos.length === 0}
                  >
                    Confirmar pago
                  </button>
                </form>

                <small className="text-muted d-block mt-3">
                  Por seguridad, no almacenamos los datos de tu tarjeta.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pago;
