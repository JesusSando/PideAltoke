import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContactoService from '../service/ContactoService'; 



function HistorialConsultas() { 
    const [consultas, setConsultas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchConsultas = async () => {
            try {  
                const res = await ContactoService.getAll();  
                setConsultas(res.data);
            } catch (err) {
                console.error("Error al cargar las consultas:", err.response || err); 
                navigate('/error');
            }  
        };

        fetchConsultas();
    }, [ ]);

    if (loading) return <div className="container py-5 text-center">Cargando consultas...</div>;
    if (error) return <div className="container py-5 text-center alert alert-danger">{error}</div>;

    return (
        <div className="container py-5">
            <h2 className="mb-4">Historial de Consultas de Contacto</h2>
            
            {consultas.length === 0 ? (
                <div className="alert alert-info">No hay consultas de contacto registradas.</div>
            ) : (
                <div className="list-group">  
                    {consultas.sort((a, b) => new Date(b.fechaEnvio) - new Date(a.fechaEnvio)).map((consulta) => (
                        <div key={consulta.id} className="list-group-item list-group-item-action mb-3">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">Consulta N° {consulta.id}</h5>
                                <small className="text-muted">
                                    Fecha: {new Date(consulta.fechaEnvio).toLocaleString()}
                                </small>
                            </div>
                            <p className="mb-1">
                                <strong>Nombre:</strong> {consulta.nombre}
                            </p>
                            <p className="mb-1">
                                <strong>Email:</strong> <a href={`mailto:${consulta.email}`}>{consulta.email}</a>
                            </p>
                            <details className="mt-2">
                                <summary>Ver mensaje completo</summary>
                                <p className="mt-2" style={{ whiteSpace: 'pre-wrap' }}>
                                    {consulta.mensaje}
                                </p>
                            </details>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}



export default HistorialConsultas;