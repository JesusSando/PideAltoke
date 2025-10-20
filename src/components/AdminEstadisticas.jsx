import React, { useEffect } from 'react';

const adminEstadistica = () => {
  const visitas = 1200;
  const compras = 150;

  useEffect(() => {
    // Asegurarse de que Chart.js esté disponible
    if (window.Chart) {
      const ctx = document.getElementById('comprasVisitasChart').getContext('2d');

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Visitas', 'Compras'],
          datasets: [{
            label: 'Cantidad',
            data: [visitas, compras],
            backgroundColor: ['#007bff', '#28a745'],
          }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
          },
          scales: {
            y: { beginAtZero: true },
          },
        },
      });

 
      document.getElementById('visitasMes').textContent = visitas;
      document.getElementById('comprasMes').textContent = compras;
    }
  }, [visitas, compras]);

  return (
    <>
 
      <section className="food_section relleno_diseño_inferior">
        <div className="container">
          <div className="heading_container encabezado_centro">
            <h2 className="h2adm">Panel de Ventas</h2>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Resumen de Ventas</h5>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                        <th>Fecha</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Pizza</td>
                        <td>3</td>
                        <td>$60.000</td>
                        <td>2025-09-03</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Hamburguesa</td>
                        <td>2</td>
                        <td>$30.000</td>
                        <td>2025-09-03</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Papas Fritas</td>
                        <td>5</td>
                        <td>$25.000</td>
                        <td>2025-09-02</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

 
    <section className="food_section" style={{ margin: "50px" }}>
        <h3>Lo más vendido</h3>
        <div className="progress">
          <div className="progress-bar" role="progressbar" style={{ width: "30%" }} aria-valuenow="15" aria-valuemin="0" aria-valuemax="100">Pizza</div>
        <div className="progress-bar bg-success" role="progressbar" style={{ width: "35%" }} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">Hamburguesa</div>
          <div className="progress-bar bg-info" role="progressbar" style={{ width: "15%" }} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">Pastas</div>
     <div className="progress-bar bg-danger" role="progressbar" style={{ width: "20%" }} aria-valuenow="15" aria-valuemin="0" aria-valuemax="100">Pastas</div>
        </div>
      </section>
 
      <section className="food_section relleno_diseño_inferior">
        <div className="container">
          <div className="heading_container encabezado_centro">
            <h2 className="h2adm">Estadísticas del último mes</h2>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body text-center">
                  <h5 className="card-title mb-4">Visitas y Compras</h5>
                  <canvas id="comprasVisitasChart" height="120"></canvas>
                  <div className="mt-4">
                    <p><strong>Visitas a la página (último mes):</strong> <span id="visitasMes">{visitas}</span></p>
                    <p><strong>Compras (último mes):</strong> <span id="comprasMes">{compras}</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default adminEstadistica;
