import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { obtenerUsuario } from '../assets/js/cargo';  

import BoletaService from "../service/BoletaService";

export function Historial() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [boletas, setBoletas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { 
    const u = obtenerUsuario(); 
     
    if (!u || !u.id) {  
      Swal.fire({  icon: "warning", title: "ERROR",
                      text: "Debes iniciar sesion" });
      navigate("/iniciarsesion");
      return;
    } 
    setUsuario(u); 

   
    const fetchHistorial = async () => {
      try { 
        const res = await BoletaService.getHistorialPorUsuario(u.id); 
        const boletasOrdenadas = res.data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        setBoletas(res.data);
      } catch (err) {
        console.error("Error al cargar el historial:", err); 
        if (err.response && err.response.status !== 404) {
             setError("Error al cargar el historial de compras.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHistorial();  
  }, [navigate]);

  const cargarDetalles = (customizacionString)=>{
    if(!customizacionString) return null;
    try{
      const data=JSON.parse(customizacionString);
      if(Object.keys(data).length===0)
        return null;
      return(
        <div className="mt-1 ps-3 border-start border-3 border-secondary" style={{fontSize: '0.85rem', color: '#555'}}>
                  {Object.entries(data).map(([key, value]) => { 
                      if (Array.isArray(value) && value.length > 0) {
                          return (
                              <div key={key}>
                                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value.map(v => v.nombre || v).join(', ')}
                              </div>
                          );
                      }
                       
                      if (value && value.nombre && !['extras', 'condimentos'].includes(key)) {
                          return (
                              <div key={key}>
                                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value.nombre}
                              </div>
                          );
                      }
                      return null;
                  })}
              </div>
          );
      } catch (e) {
          return null;  
      }
  };

  if (loading) return <div className="container py-5 text-center">Cargando historial...</div>;
  if (error) return <div className="container py-5 text-center alert alert-danger">{error}</div>;

  return (
    <div className="container py-5">
      <h2 className="mb-4">Historial de Compras de {usuario.nombre}</h2>
      
      {boletas.length === 0 ? (
        <div className="alert alert-info">Aún no tienes compras realizadas.</div>
      ) : (
        <div className="list-group">
          {boletas.map((boleta) => (
            <div key={boleta.id} className="list-group-item list-group-item-action mb-3">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Boleta N° {boleta.id}</h5>
                <small className="text-muted">Fecha: {new Date(boleta.fecha).toLocaleDateString()}</small>
              </div>
              <p className="mb-1">
                <strong>Total:</strong> ${boleta.total.toLocaleString()} - 
                <strong> Estado:</strong> <span className={`badge bg-${boleta.estado === 'Pagado' ? 'success' : 'warning'}`}>{boleta.estado}</span>
              </p>
              <details className="mt-2">
                <summary>Ver detalle de {boleta.compras.length} productos</summary>
                <ul className="list-group list-group-flush mt-2">
                  {boleta.compras.map((item) => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between">
                    <span>
   
                        {item.comida ? item.comida.nombre : 'Producto no disponible'}
                    </span> 
                    <small>
                        {item.cantidad} x ${item.precioUnitario.toLocaleString()} = 
                        <strong> ${(item.cantidad * item.precioUnitario).toLocaleString()}</strong>
                    </small>
                    {cargarDetalles(item.customizacion)}
                </li>
                  ))}
                </ul>
              </details>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Historial;