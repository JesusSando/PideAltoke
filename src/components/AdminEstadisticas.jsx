import React, { useEffect, useState ,useMemo} from "react";

import BoletaService from "../service/BoletaService";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2'; 
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);
import ChartDataLabels from 'chartjs-plugin-datalabels';

export function ResumenDiarioVentas({ventas}) {
  console.log("Props recibidas en la tabla:", ventas);
    
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 10;

  const indiceUltimo = paginaActual * itemsPorPagina;
  const indicePrimero = indiceUltimo - itemsPorPagina;
  const ventasVisibles = ventas.slice(indicePrimero, indiceUltimo);
  const totalPaginas = Math.ceil(ventas.length / itemsPorPagina);

  function irAnterior() {
     setPaginaActual(p => p - 1);}
  function irSiguiente() {
     setPaginaActual(p => p + 1);
  }
   const totalDinero = useMemo(() => ventas.reduce((acc, v) => acc + (v.total || 0), 0), [ventas]);
  const totalCantidad = useMemo(() => ventas.reduce((acc, v) => acc + (v.cantidad || 0), 0), [ventas]);

  return (
 <div className="container mt-4">
      <h2>ventas del dia</h2>
     <div className="table-responsive">
      <table className="table table-hover table-bordered text-center align-middle">
            <thead className="table-light">
              <tr>
                <th>Id Boleta</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Total</th>
                <th>Hora</th>
              </tr>
            </thead>
            <tbody>
              {ventasVisibles.length > 0 ? (
                ventasVisibles.map((v, i) => (
                  <tr key={i}>
                    <td>{v.id_boleta}</td>
                    <td>{v.producto}</td>
                    <td>{v.cantidad} </td>
                    <td >${v.total}</td>
                    <td>{v.fecha ? new Date(v.fecha).toLocaleTimeString() : '-'}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="5">no hay ventas</td></tr>
              )}
            </tbody>
          </table>
 
      
    </div>
    <div className="d-flex justify-content-end mt-3">
           <div className="border rounded p-2  ">
              <span className="me-3">Cantidad venta: <b>{totalCantidad}</b></span>
              <span className="mx-4" >Total ganacia: <b>${totalDinero}</b></span>
           </div>
     </div>
    <nav className="mt-4">
        <ul className="pagination justify-content-center">
            <li className={`page-item ${paginaActual === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={irAnterior}>Anterior</button>
            </li>
            <li className="page-item disabled">
                <span className="page-link text-dark"> 
                    pagina {paginaActual}-{totalPaginas} 
                </span>
            </li>
            <li className={`page-item ${paginaActual === totalPaginas ? 'disabled' : ''}`}>
                <button className="page-link" onClick={irSiguiente}>Siguiente</button>
            </li>
        </ul>
      </nav>

  </div>


 
  );
}



export function GraficoAnual({ data }) {
  const chartData = {
    labels: data.map(d => d.mes),
    datasets: [{
      label: 'Ingresos ($)',
      data: data.map(d => d.total),
      backgroundColor: 'lightgreen',
      borderRadius: 5,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'top' } }};

  return (
    <div className="card shadow h-100">
      <div className="card-header bg-primary text-white">
        <h5 className="m-0">Ganancia anual</h5>
      </div>
      <div className="card-body" style={{ height: "300px" }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}


export function GraficoCategorias({ data }) {
  const chartData = {
    labels: data.map(d => d.name),
    datasets: [{
      data: data.map(d => d.value),
      backgroundColor: [
        'lightcoral',
        'yellow',
        'lightgreen',
        'skyblue',
        'plum',]
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'right' },
  datalabels: {
        color: 'black', 
        font: { 
          size: 15
        },
        formatter: (value) => { 
          return value; 
        }
      } }
  };

  return (
    <div className="card shadow h-100">
      <div className="card-header bg-primary text-white">
        <h5 className="m-0">Tipo comida mas vendida del mes</h5>
      </div>
      <div className="card-body" style={{ height: "300px" }}>
        <Doughnut data={chartData} options={options}  plugins={[ChartDataLabels]}/>
      </div>
    </div>
  );
}

export function AdminEstadisticas()  {

  const [ventas, setVentas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [anual, setAnual] = useState([]);

  useEffect(() => {
    BoletaService.getResumenHoy().then(res => setVentas(res.data));
    BoletaService.getCategoriasMes().then(res => setCategorias(res.data));
    BoletaService.getRendimientoAnual().then(res => setAnual(res.data));
  }, []);

  useEffect(() => { 
    BoletaService.getResumenHoy().then(res => {
        console.log("Datos recibidos:", res.data);  
        setVentas(res.data);
    });
  }, []);
 
  return (
    <>
  <div className="container mt-4 mb-5">
      <h2 className="mb-4 text-center fw-bold">Panel de Control</h2>

     <div className="row mb-4">
        <div className="col-lg-5 col-md-12 mb-3">
           <GraficoCategorias data={categorias} />
        </div>
        <div className="col-lg-7 col-md-12 mb-3">
           <GraficoAnual data={anual} />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
           <ResumenDiarioVentas ventas={ventas} />
        </div>
      </div>
  </div>
    </>
  );
};


