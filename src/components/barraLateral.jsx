import { useState, useEffect, useMemo } from "react";
import ComidaService from "../service/ComidaService";
import { agregarAlCarrito } from "../assets/js/agregarCarrito";
const TIPOS_COMPLEJOS = ["pizza", "hamburguesa", "burrito"];

function BarraLateral({ open, onClose, product, onConfirm }) {
  if (!open || !product) return null;

  const esComplejo = TIPOS_COMPLEJOS.includes(product.tipoComida?.toLowerCase());

  const [pasoActual, setPasoActual] = useState(1);
  const [configJson, setConfigJson] = useState(null);
  const [cantidadPrincipal, setCantidadPrincipal] = useState(1);

  //seleccion del usuario
  const [seleccionJson, setSeleccionJson] = useState({}); //opciones del json Masa salsa  etc
  const [extrasBDSeleccionados, setExtrasBDSeleccionados] = useState([]); 

  const [catalogoBD, setCatalogoBD] = useState({
    acompanantes: [],
    postres: [],
    bebidas: []
  });

  const IMAGEN_BASE_URL = "http://98.95.19.168:8080/uploads/";

  useEffect(() => {
    if (open && product) {
      //resetear estados
      setPasoActual(1);
      setSeleccionJson({});
      setCantidadPrincipal(1);
      setExtrasBDSeleccionados([]);
      setConfigJson(null);

      // confi para pizza hamburguesa y burrito cargamos su json de configuracion
      if (esComplejo) {
        const archivo = product.tipoComida.toLowerCase();
        fetch(`/json/${archivo}.json`)
          .then((res) => (res.ok ? res.json() : null))
          .then((data) => {
             setConfigJson(data);
             if (data && data.pasos) {
                 const defaults = {};
                 data.pasos.forEach(paso => {
                     if (paso.tipoInput === 'radio' && paso.opciones.length > 0) {
                         defaults[paso.key] = paso.opciones[0];
                     }
                     if (paso.tipoInput === 'checkbox') {
                         defaults[paso.key] = [];
                     }
                 });
                 setSeleccionJson(defaults);
             }
          })
          .catch((err) => console.error("Error cargando JSON", err));
      }

      //cargar catalogo proveniente de la bd 
      if (esComplejo) {
          ComidaService.getAll().then((res) => {
            const todos = res.data;
            setCatalogoBD({
              acompanantes: todos.filter((c) => c.tipoComida === "acompañante"),
              postres: todos.filter((c) => c.tipoComida === "postre"),
              bebidas: todos.filter((c) => c.tipoComida === "bebida"),
            });
          });
      }
    }
  }, [open, product, esComplejo]);

  //radio y el checkbox
  const handleJsonChange = (key, opcion, tipoInput) => {
    if (tipoInput === "radio") {
      setSeleccionJson((prev) => ({ ...prev, [key]: opcion }));
    } else {
      setSeleccionJson((prev) => {
        const actuales = prev[key] || [];
        const existe = actuales.find((i) => i.nombre === opcion.nombre);
        return existe
          ? { ...prev, [key]: actuales.filter((i) => i.nombre !== opcion.nombre) }
          : { ...prev, [key]: [...actuales, opcion] };
      });
    }
  };

  //botones + y -
  const handleExtraBD = (item, delta) => {
    setExtrasBDSeleccionados((prev) => {
      const existente = prev.find((i) => i.id === item.id);
      if (existente) {
        const nuevaCant = existente.cantidad + delta;
        if (nuevaCant <= 0) return prev.filter((i) => i.id !== item.id);
        return prev.map((i) => (i.id === item.id ? { ...i, cantidad: nuevaCant } : i));
      } else if (delta > 0) {
        return [...prev, { ...item, cantidad: 1 }];
      }
      return prev;
    });
  };

  //caLCULO DE TOTALES 
  const totales = useMemo(() => {
    let t = {
      precio: product.oferta ? product.precioOferta : product.precio,
      calorias: product.energia || 0,
      grasas: product.grasa || 0,
      colesterol: product.colesterol || 0,
      carbs: product.carbohidratos || 0,
      azucar: product.azucar || 0,
      proteina: product.proteinas || 0,
      sal: product.sal || 0,
    };

    //sumar opciones del json
    if (esComplejo && configJson) {
      Object.values(seleccionJson).forEach((val) => {
        const lista = Array.isArray(val) ? val : [val]; //normalizar array
        lista.forEach((opcion) => {
          if (!opcion) return;
          t.precio += opcion.precio || 0;
          t.calorias += opcion.calorias || 0;
          t.grasas += opcion.grasas || 0;
          t.colesterol += opcion.colesterol || 0;
          t.carbs += opcion.carbohidratos || 0;
          t.azucar += opcion.azucares || 0;
          t.proteina += opcion.proteinas || 0;
          t.sal += opcion.sal || 0;
        });
      });
    }

    //multiplicar por la cantidad del producto principal
    const precioPrincipalTotal = t.precio * cantidadPrincipal;
    
    //final acumulador
    let final = {
        precio: precioPrincipalTotal,
        calorias: t.calorias * cantidadPrincipal,
        grasas: t.grasas * cantidadPrincipal,
        colesterol: t.colesterol * cantidadPrincipal,
        carbs: t.carbs * cantidadPrincipal,
        azucar: t.azucar * cantidadPrincipal,
        proteina: t.proteina * cantidadPrincipal,
        sal: t.sal * cantidadPrincipal
    };

    //acompañantes-bebidas-postres
    extrasBDSeleccionados.forEach((extra) => {
        const precioExtra = extra.oferta ? extra.precioOferta : extra.precio;
        const qty = extra.cantidad;
        
        final.precio += precioExtra * qty;
        final.calorias += (extra.energia || 0) * qty;
        final.grasas += (extra.grasa || 0) * qty;
        final.colesterol += (extra.colesterol || 0) * qty;
        final.carbs += (extra.carbohidratos || 0) * qty;
        final.azucar += (extra.azucar || 0) * qty;
        final.proteina += (extra.proteina || 0) * qty;
        final.sal += (extra.sal || 0) * qty;
    });

    return final;
  }, [product, seleccionJson, cantidadPrincipal, extrasBDSeleccionados, configJson, esComplejo]);

  const confirmarPedido = () => {
    const precioUnitarioConJson = (product.oferta ? product.precioOferta : product.precio) + 
       (Object.values(seleccionJson).reduce((acc, val) => {
           const lista = Array.isArray(val) ? val : [val];
           return acc + lista.reduce((a, v) => a + (v?.precio || 0), 0);
       }, 0));


       console.log("GUARDANDO EN CARRITO - Customización:", seleccionJson);
    const itemPrincipal = {
      ...product,
      id: product.id + Math.random(), 
      idOriginal: product.id,
      nombre: esComplejo ? `${product.nombre} (Personalizado)` : product.nombre,
      precio: precioUnitarioConJson,
      cantidad: cantidadPrincipal,
      customizacion: seleccionJson,
    };

    agregarAlCarrito(itemPrincipal);

    extrasBDSeleccionados.forEach((extra) => {
        agregarAlCarrito({
            ...extra,
            id: extra.id + Math.random(), //evitar id duplicados 
            idOriginal: extra.id
        });
    });

    onConfirm(); 
    onClose();
  };


  const renderVistaSimple = () => (
    <div className="step-content">
        <h3>{product.nombre}</h3>
        <p  >{product.descripcion}</p>
        {product.imagen && <img src={IMAGEN_BASE_URL + product.imagen} className="img-fluid rounded mb-3" alt="prod"/>}
        
        <div className="cantidad-box text-center">
            <button onClick={() => cantidadPrincipal > 1 && setCantidadPrincipal(cantidadPrincipal - 1)}>-</button>
            <span className="fs-4 mx-3">{cantidadPrincipal}</span>
            <button onClick={() => setCantidadPrincipal(cantidadPrincipal + 1)}>+</button>
        </div>
    </div>
  );
  const renderPaso1Json = () => (
    <div className="step-content">
      <h3>Personaliza tu {product.nombre}</h3>
      {configJson?.pasos.map((paso, idx) => (
        <div key={idx} className="cs-categoria">
          <h5 className="mb-2">{paso.titulo}</h5>
          {paso.opciones.map((opcion, i) => (
            <label key={i} className="cs-item d-flex justify-content-between align-items-center mb-2 p-2 border rounded">
              <div className="d-flex align-items-center">
                <input
                  type={paso.tipoInput}
                  name={paso.key}
                  checked={
                    paso.tipoInput === "radio"
                      ? seleccionJson[paso.key]?.nombre === opcion.nombre
                      : (seleccionJson[paso.key] || []).some((x) => x.nombre === opcion.nombre)
                  }
                  onChange={() => handleJsonChange(paso.key, opcion, paso.tipoInput)}
                  style={{transform: 'scale(1.2)', marginRight: '10px'}}
                />
                <span>{opcion.nombre}</span>
              </div>
              <div className="text-end lh-1">
                {opcion.precio > 0 && <span className="d-block text-danger fw-bold">+${opcion.precio}</span>}
                {opcion.calorias > 0 && <small >+{opcion.calorias} kcal</small>}
              </div>
            </label>
          ))}
        </div>
      ))}
      
      <div className="mt-4 p-3 bg-light rounded">
        <label className="fw-bold d-block mb-2">Cantidad de {product.nombre}:</label>
        <div className="cantidad-box d-flex align-items-center">
            <button className="btn btn-sm btn-outline-dark" onClick={() => cantidadPrincipal > 1 && setCantidadPrincipal(cantidadPrincipal - 1)}>-</button>
            <span className="fs-5 mx-3">{cantidadPrincipal}</span>
            <button className="btn btn-sm btn-outline-dark" onClick={() => setCantidadPrincipal(cantidadPrincipal + 1)}>+</button>
        </div>
      </div>
    </div>
  );
  const renderListaBD = (lista, titulo) => (
    <div className="step-content">
      <h3>{titulo}</h3>
      {lista.length === 0 && <p className="text-muted">No hay opciones disponibles.</p>}
      <div className="row">
        {lista.map((item) => {
          const seleccionado = extrasBDSeleccionados.find((s) => s.id === item.id);
          const qty = seleccionado ? seleccionado.cantidad : 0;
          return (
            <div key={item.id} className="col-12 mb-2">
              <div className="card p-2 shadow-sm">
                <div className="d-flex align-items-center">
                    {item.imagen && (
                        <img src={IMAGEN_BASE_URL + item.imagen} style={{width: 60, height: 60, objectFit: 'cover', borderRadius: 8}} alt="img" />
                    )}
                    <div className="ms-3 flex-grow-1">
                        <h6 className="mb-0">{item.nombre}</h6>
                        <div className="d-flex justify-content-between align-items-center">
                            <span className="text-danger fw-bold">${item.oferta ? item.precioOferta : item.precio}</span>
                            <small>{item.energia} kcal</small>
                        </div>
                    </div>

                    <div className="d-flex align-items-center bg-light rounded px-2">
                        {qty > 0 ? (
                            <>
                                <button className="btn btn-sm text-danger fw-bold" onClick={() => handleExtraBD(item, -1)}>-</button>
                                <span className="mx-2 fw-bold">{qty}</span>
                                <button className="btn btn-sm text-success fw-bold" onClick={() => handleExtraBD(item, 1)}>+</button>
                            </>
                        ) : (
                            <button className="btn btn-sm btn-outline-secondary" onClick={() => handleExtraBD(item, 1)}>Agregar</button>
                        )}
                    </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="customizar-barra-overlay">
      <div className="customizar-barra d-flex flex-column">
        <button className="cerrar-btn" onClick={onClose}>✖</button>

        {esComplejo && (
            <div className="steps-indicator d-flex justify-content-around mb-3 pb-2 border-bottom">
                <small className={pasoActual === 1 ? "text-danger fw-bold" : "text-muted"}>1. Personaliza</small>
                <small className={pasoActual === 2 ? "text-danger fw-bold" : "text-muted"}>2. Acompaña</small>
                <small className={pasoActual === 3 ? "text-danger fw-bold" : "text-muted"}>3. Postre/Bebida</small>
            </div>
        )}

        <div className="flex-grow-1 overflow-auto pe-2">
            {!esComplejo && renderVistaSimple()}
            {esComplejo && pasoActual === 1 && renderPaso1Json()}
            {esComplejo && pasoActual === 2 && renderListaBD(catalogoBD.acompanantes, "¿Algo para picar?")}
            {esComplejo && pasoActual === 3 && (
                <>
                    {renderListaBD(catalogoBD.bebidas, "Bebidas Refrescantes")}
                    <hr/>
                    {renderListaBD(catalogoBD.postres, "El toque dulce")}
                </>
            )}
        </div>
        <div className="sidebar-footer mt-2 border-top pt-2">
            <div className="nutritional-summary p-2 rounded mb-2" style={{fontSize: '0.75rem'}}>
                <div className="d-flex justify-content-between fw-bold mb-1">
                    <span>Energia: {Math.round(totales.calorias)} kcal</span>
                    <span>Sal: {totales.sal.toFixed(1)} g</span>
                </div>
                <div className="d-flex justify-content-between  ">
                    <span>Grasa: {totales.grasas.toFixed(1)}g</span>
                    <span>Carbs: {totales.carbs.toFixed(1)}g</span>
                    <span>Prot: {totales.proteina.toFixed(1)}g</span>
                </div>
            </div>

            <div className="d-flex justify-content-between align-items-center">
                <h3 className="m-0 text-danger">${totales.precio.toLocaleString()}</h3>
                <div className="d-flex gap-2">
                    {esComplejo && pasoActual > 1 && (
                        <button className="btn btn-outline-secondary" onClick={() => setPasoActual(pasoActual - 1)}>Atrás</button>
                    )}
                    
                    {esComplejo && pasoActual < 3 ? (
                        <button className="btn btn-danger" onClick={() => setPasoActual(pasoActual + 1)}>Siguiente</button>
                    ) : (
                        <button className="btn btn-success px-4" onClick={confirmarPedido}>
                            {esComplejo ? "Confirmar Todo" : "Agregar al Carrito"}
                        </button>
                    )}
                </div>
            </div>
        </div>

      </div>
      <div className="overlay" onClick={onClose}></div>
    </div>
  );
}

export default  BarraLateral;