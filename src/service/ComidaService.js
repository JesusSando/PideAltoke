import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/comidas";

class ComidaService {

 /**
     * @return
     */
    getAll() {
        return axios.get(API_URL);
    }
    
    /**

     * @param {FormData} data
     * @returns Promise
     */
    add(data) {
      
        return axios.post(API_URL, data);
    }

    /**
     * @param {number} id 
     * @param {FormData} data -
     * @returns Promise
     */
    update(id, data) {
       
        return axios.put(`${API_URL}/${id}`, data);
    }

    /**
     * @param {number} id 
     * @returns Promise
     */
    delete(id) {
        return axios.delete(`${API_URL}/${id}`);
    }
 
}
export default new ComidaService();
