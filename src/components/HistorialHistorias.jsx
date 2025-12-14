import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import BoletaService from "../service/BoletaService";

 function HistorialHistorias() {  
    const navigate = useNavigate(); 
    const [boletas, setBoletas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => { 
        const fetchHistorial = async () => {
          try {  
  
               const res = await BoletaService.getAll(); 
                setBoletas(res.data);
            } catch (err) {
                console.error("Error al cargar el historial completo:", err.response || err); 
                
            } finally {
                setLoading(false);
            }
        };

        fetchHistorial(); 
    }, [ ]);


    const handleChangeEstado = async (boletaId, nuevoEstado) => { 
        const boletasAnteriores = [...boletas]; 
        setBoletas(prevBoletas => 
            prevBoletas.map(b => 
                b.id === boletaId ? { ...b, estado: nuevoEstado } : b
            )
        ); 
        try { 
            await BoletaService.actualizarEstado(boletaId, nuevoEstado);
            
            alert(`Boleta ${boletaId} actualizada correctamente.`);
            
        } catch (error) {
            console.error("Error al actualizar", error);
            alert("no se pudo guardar el cambio  "); 
            setBoletas(boletasAnteriores);
        }
    };


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

    if (loading) return <div className="container py-5 text-center">Cargando historial de clientes...</div>;
    if (error) return <div className="container py-5 text-center alert alert-danger">{error}</div>;

    return (
        <div className="container py-5">
            <h2 className="mb-4">todos los pedidos</h2>
            
            {boletas.length === 0 ? (
                <div className="alert alert-info">No hay compras realizadas en el sistema.</div>
            ) : (
                <div className="list-group">
                    {boletas.map((boleta) => (
                        <div key={boleta.id} className="list-group-item list-group-item-action mb-3">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">Boleta N° {boleta.id}</h5>
                                
                                <small className="text-muted"> Cliente: {boleta.usuario ? boleta.usuario.nombre : 'N/A'} | 
                                    Fecha: {new Date(boleta.fecha).toLocaleDateString()}
                                </small>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <div><strong>Total:</strong> ${boleta.total.toLocaleString()}</div>
                                
                                <div className="d-flex align-items-center">
                                    <strong className="me-2">Estado:</strong>
                                    <select  className={`form-select form-select-sm ${
                                            boleta.estado === 'ENTREGADO' ? 'border-success text-success' : 
                                            boleta.estado === 'EN_CAMINO' ? 'border-primary text-primary' : '' }`}
                                        style={{ width: 'auto', minWidth: '150px' }} value={boleta.estado || ""} 
                                        onChange={(e) => handleChangeEstado(boleta.id, e.target.value)} >
                                        <option value="EN_ESPERA">En Espera</option>
                                        <option value="PREPARANDO">Preparando</option>
                                        <option value="EN_CAMINO">En Camino</option>
                                        <option value="ENTREGADO">Entregado</option>
                                    </select>
                                </div>
                            </div>
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

export default HistorialHistorias;