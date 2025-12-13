import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/usuario";

class UsuarioService {
 
  registrar(usuario) {
    return axios.post(API_URL, usuario);
  }
 
  login(correo, contrasena) {
    return axios.post(`${API_URL}/login`, { correo, contrasena });
  }
 
  getAll() {
    return axios.get(API_URL);
  }
 
  getByCorreo(correo) {
    return axios.get(`${API_URL}/correo/${correo}`);
  }


update(id, usuario) {
        return axios.put(`${API_URL}/${id}`, usuario); 
    }
 
    delete(id) {
        return axios.delete(`${API_URL}/${id}`); 
    }

  
   verificarCorreoExistente(correo) { 
        return axios.get(`${API_URL}/verificar-correo/${correo}`);
    }


    cambiarContrasenaOlvidada(correo, nuevaContrasena) {
    return axios.put(`${API_URL}/recuperar-contrasena`, {
        correo: correo,
        nuevaContrasena: nuevaContrasena
    });}
 
}

export default new UsuarioService();