import React, { useState } from "react";
import ContactoService from "../service/ContactoService"; 
import { validarCorreo } from "../assets/js/validarcorreo";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

function Contacto() {
  const navigate = useNavigate();
    const [formData, setFormData] = useState({  nombre: "", email: "", mensaje: "", });

    const [emailValido, setEmailValido] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === "email") { 
            if (value.length === 0) {
                setEmailValido(null);
            } else { 
                setEmailValido(validarCorreo(value));
            }
        }
    };
 

    const handleSubmit = async (e) => {  
        e.preventDefault();
  //Validar campos vacíos
        if (!formData.nombre.trim() || !formData.email.trim() || !formData.mensaje.trim()) {
            Swal.fire({
                icon: "warning",
                title: "Campos incompletos",
                text: "Por favor, completa todos los campos antes de enviar"
            });
            return;  
        }

        if (!validarCorreo(formData.email)) {
             Swal.fire({ icon: "error", title: "Correo inválido",  text: "El formato del correo no es correcto." });
            return;
        }
    
        

        try { 
            await ContactoService.add(formData);  
          await  Swal.fire({
                    position: "top-end", 
                    icon: "success",
                    title: "Mensaje enviado correctamente",
                    showConfirmButton: false, 
                    timer: 3000, 
                    toast: true, 
                    background: '#333',
                    color: '#fff' 
                });

            setFormData({
                nombre: "",
                email: "",
                mensaje: "",
            });
        } catch (error) {
            console.error("Error al enviar el mensaje:", error.response || error);
            alert("Error al enviar el mensaje"); 
        } 
    };
     
    return (
    <section className="seccion_contacto relleno_diseño_inferior">
      <div className="container">
        <h2 className="text-center mb-4">Contáctanos</h2>

        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input

                      type="text"
                      name="nombre"
                      className="form-control"
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Tu nombre completo"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Correo electrónico</label>
                    <input  type="email" name="email" className="form-control"
                      value={formData.email} onChange={handleChange}  placeholder="ejemplo@correo.com"
                      required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Mensaje</label>
                    <textarea
                      name="mensaje"
                      className="form-control"
                      rows="5"
                      value={formData.mensaje}
                      onChange={handleChange}
                      placeholder="Escribe tu mensaje aquí..."
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    Enviar mensaje
                  </button>
                </form>
              </div>
            </div>

            <div className="text-center mt-4 text-muted">
              <p>Dirección: Antonio Varas 666, Santiago</p>
              <p>Teléfono: +56 9 1234 5678</p>
              <p>Email: contacto@pidealtok.cl</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contacto;
