import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/contacto"; 

class ContactoService {
    /** 
     * @param {object} data - {nombre, email, mensaje}
     */
    add(data) { 
        return axios.post(API_URL, data);
    }

    
    getAll() {
        return axios.get(API_URL);
    }
}

export default new ContactoService();