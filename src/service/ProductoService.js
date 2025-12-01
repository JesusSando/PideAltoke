import axios from "axios";

// Ajusta el puerto si es necesario
const API_URL = "http://localhost:8080/api/v1/producto"; 

class ProductoService {
 
    // crear  
  registrar(producto) {
  return axios.post(API_URL, producto);
  }
 
 
   getAll() {
    return axios.get(API_URL);
  }

  
    update(id, producto) {
     return axios.put(`${API_URL}/${id}`, producto); 
   }
  
   
   delete(id) {
   return axios.delete(`${API_URL}/${id}`); 
  }
}

export default new ProductoService();