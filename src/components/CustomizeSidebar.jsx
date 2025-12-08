import { useState, useEffect } from "react";

export default function CustomizeSidebar({
  open,
  onClose,
  product,
  data,
  onConfirm,
}) {
  if (!open || !product || !data) return null;

  const [masa, setMasa] = useState("");
  const [borde, setBorde] = useState("");
  const [extras, setExtras] = useState([]);
  const [condimentos, setCondimentos] = useState([]);
  const [bebida, setBebida] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  const precioBase = product.oferta ? product.precioOferta : product.precio;
 
  const calcularTotal = () => {
    const precioExtras = extras.reduce((acc, ex) => acc + ex.precio, 0);
    const precioBebida = bebida ? bebida.precio : 0;

    return (precioBase + precioExtras + precioBebida) * cantidad;
  };

  const toggleExtra = (extra) => {
    setExtras((prev) =>
      prev.some((e) => e.nombre === extra.nombre)
        ? prev.filter((e) => e.nombre !== extra.nombre)
        : [...prev, extra]
    );
  };

  const toggleCondimento = (c) => {
    setCondimentos((prev) =>
      prev.includes(c)
        ? prev.filter((x) => x !== c)
        : [...prev, c]
    );
  };

  const confirmar = () => {
    const detalle = {
      id: product.id,
      nombre: product.nombre,
      tipoComida: product.tipoComida,
      cantidad,
      precioUnitario: calcularTotal() / cantidad,
      total: calcularTotal(),

      //guardaremos en la boleta JSON limpio
      customizacion: {
        masa,
        borde,
        extras,
        condimentos,
        bebida,
      },

      //imagen y otros datos  
      imagen: product.imagen,
    };

    onConfirm(detalle);
  };

  return (
    <div className="customize-sidebar-overlay">
      <div className="customize-sidebar">

 
        <button className="close-btn" onClick={onClose}>✖</button>

        <h2>Personalizar {product.nombre}</h2>

        {/* la masa */}
        <h4>Masa</h4>
        {data.masas.map((m) => (
          <label key={m}>
            <input
              type="radio"
              name="masa"
              checked={masa === m}
              onChange={() => setMasa(m)}
            />
            {m}
          </label>
        ))}

        <hr />

        {/* el borde  */}
        <h4>Borde</h4>
        {data.bordes.map((b) => (
          <label key={b}>
            <input
              type="radio"
              name="borde"
              checked={borde === b}
              onChange={() => setBorde(b)}
            />
            {b}
          </label>
        ))}

        <hr />

        {/* EXTRAS */}
        <h4>Extras</h4>
        {data.extras.map((ex) => (
          <label key={ex.nombre}>
            <input
              type="checkbox"
              checked={extras.some((e) => e.nombre === ex.nombre)}
              onChange={() => toggleExtra(ex)}
            />
            {ex.nombre} (+${ex.precio})
          </label>
        ))}

        <hr />

        {/* CONDIMENTOS */}
        <h4>Condimentos</h4>
        {data.condimentos.map((c) => (
          <label key={c}>
            <input
              type="checkbox"
              checked={condimentos.includes(c)}
              onChange={() => toggleCondimento(c)}
            />
            {c}
          </label>
        ))}

        <hr />

        {/* la bebidas */}
        <h4>Bebida</h4>
        {data.bebidas.map((b) => (
          <label key={b.nombre}>
            <input
              type="radio"
              name="bebida"
              checked={bebida?.nombre === b.nombre}
              onChange={() => setBebida(b)}
            />
            {b.nombre} (+${b.precio})
          </label>
        ))}

        <hr />

        {/* LA CANTIDAD DE ESAS PIZZAS */}
        <h4>Cantidad</h4>
        <div className="cantidad-box">
          <button onClick={() => cantidad > 1 && setCantidad(cantidad - 1)}>
            -
          </button>
          <span>{cantidad}</span>
          <button onClick={() => setCantidad(cantidad + 1)}>+</button>
        </div>

        <hr />

        {/* EL TOTAL */}
        <h3>Total: ${calcularTotal()}</h3>

        {/*BOTON DE  CONFIRMAR */}
        <button className="confirm-btn" onClick={confirmar}>
          Confirmar
        </button>
      </div>

      {/* fondo oscuro */}
      <div className="overlay" onClick={onClose}></div>
    </div>
  );
}