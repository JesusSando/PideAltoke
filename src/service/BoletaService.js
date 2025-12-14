import axios from "axios";

const API_URL = "http://98.95.19.168:8080/api/v1/boleta";

class BoletaService {

  crearBoleta(data) {
    return axios.post(API_URL, data);
  }

  getBoletasUsuario(usuarioId) {
    return axios.get(`${API_URL}/usuario/${usuarioId}`);
  }

  getHistorialPorUsuario(usuarioId) {
    return axios.get(`${API_URL}/usuario/${usuarioId}`);
  }

  getAll() {
        return axios.get(API_URL); 
    } 
  getResumenVentas() {
      return axios.get(`${API_URL}/estadisticas/resumenDiario`);} 
  getResumenHoy() { 
        return axios.get(API_URL + "/estadisticas/resumenHoy");} 
  getCategoriasMes() {
      return axios.get(`${API_URL}/estadisticas/categorias-mes`);
  } 
  getRendimientoAnual() {
      return axios.get(`${API_URL}/estadisticas/rendimiento-anual`);
    }


    actualizarEstado(id, nuevoEstado) { 
        return axios.patch(`${API_URL}/${id}/estado`, null, {
            params: {
                nuevoEstado: nuevoEstado
            }
        });
    }
    
}

export default new BoletaService();