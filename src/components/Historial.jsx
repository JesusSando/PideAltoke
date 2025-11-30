import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
 
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
      alert("Debes iniciar sesión para ver tu historial.");
      navigate("/iniciarsesion");
      return;
    } 
    setUsuario(u); 

   
    const fetchHistorial = async () => {
      try { 
        const res = await BoletaService.getHistorialPorUsuario(u.id); 
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