import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/comidas";

class ComidaService {

 
    getAll() {
        return axios.get(API_URL);
    }
     
    add(data) {
      
        return axios.post(API_URL, data);
    }

    
    update(id, data) {
        return axios.put(`${API_URL}/${id}`, data);
    }

   
    delete(id,rutUsuario) {
        return axios.delete(`${API_URL}/${id}?rutUsuario=${rutUsuario}`);
    }
 
}
export default new ComidaService();
