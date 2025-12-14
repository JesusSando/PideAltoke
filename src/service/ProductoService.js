import axios from "axios";

 
const API_URL = "http://98.95.19.168:8080/api/v1/producto"; 

class ProductoService {
 
    // crear  
  registrar(formData) {
  return axios.post(API_URL, formData);
  }
 
 
   getAll() {
    return axios.get(API_URL);
  }

  
    update(id, formData) {
     return axios.put(`${API_URL}/${id}`, formData); 
   }
  
   
   delete(id,rutUsuario) {
  return axios.delete(`${API_URL}/${id}?rutUsuario=${rutUsuario}`);
  }
}

export default new ProductoService();