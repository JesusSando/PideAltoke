import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/usuario";

class UsuarioService {

  // Registrar un nuevo usuario
  registrar(usuario) {
    return axios.post(API_URL, usuario);
  }

  // Iniciar sesión
  login(correo, contrasena) {
    return axios.post(`${API_URL}/login`, { correo, contrasena });
  }

  // Obtener todos los usuarios (opcional)
  getAll() {
    return axios.get(API_URL);
  }

  // Obtener usuario por correo (opcional)
  getByCorreo(correo) {
    return axios.get(`${API_URL}/correo/${correo}`);
  }
}

export default new UsuarioService();