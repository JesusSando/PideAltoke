// Archivo para manejar las estadísticas de visitas y compras

// Datos de ejemplo (puedes reemplazar por datos dinámicos)
const visitas = 1200;
const compras = 150;

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('visitasMes').textContent = visitas;
  document.getElementById('comprasMes').textContent = compras;

  const ctx = document.getElementById('comprasVisitasChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Visitas', 'Compras'],
      datasets: [{
        label: 'Cantidad',
        data: [visitas, compras],
        backgroundColor: ['#007bff', '#28a745']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
});