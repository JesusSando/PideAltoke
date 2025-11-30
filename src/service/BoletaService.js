import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/boleta";

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
}

export default new BoletaService();