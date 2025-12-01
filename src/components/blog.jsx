import { Link } from "react-router-dom";
import React, { useEffect ,useState} from 'react'; 
import BlogService from "../service/BlogService"; // 💡 1. Importar el servicio

// URL base para las imágenes estáticas del backend
const UPLOAD_BASE_URL = "http://localhost:8080/uploads/"; 

function Blog(){
    const [blogs, setBlogs] = useState([]); // 💡 Renombrado a blogs
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
        const cargarBlog = async () => {
            setLoading(true);
            try {
                // 💡 2. Usar el servicio para obtener datos del backend
                const res = await BlogService.getAll();
                setBlogs(res.data);
            } catch (error) {
                console.error('Error al cargar los blogs:', error);
                // Opcional: mostrar un mensaje de error al usuario
            } finally {
                setLoading(false);
            }
        };
        cargarBlog();
    }, []);

    if (loading) {
        return <section className="blog_area section-padding"><div className="container">Cargando artículos...</div></section>;
    }
    
    // Si no hay blogs
    if (blogs.length === 0) {
        return <section className="blog_area section-padding"><div className="container">No hay artículos disponibles.</div></section>;
    }


    return(
        <section className="blog_area section-padding">
            <div className="container">
                <div className="row">
                    {/* 💡 3. Usamos 'blogs.map' */}
                    {blogs.map((blog) => ( 
                        <div key={blog.id} className="col-lg-8 mb-5 mb-lg-0">
                            <div className="blog_left_sidebar">
                                
                                <article className="blog_item">
                                    <div className="blog_item_img">
                                        {/* 💡 4. Cargar Imagen Principal con la URL correcta */}
                                        {blog.imagen && (
                                            <img 
                                                className="card-img rounded-0" 
                                                src={UPLOAD_BASE_URL + blog.imagen} 
                                                alt={blog.titulo} 
                                            />
                                        )}
                                        
                                        {/* Fecha y enlace */}
                                        <Link to={`/blog/${blog.id}`} className="d-inline-block blog_item_date">
                                            <h3>{blog.fecha}</h3>
                                        </Link>
                                    </div>
                                    
                                    <div className="blog_details">
                                        {/* Título y enlace */}
                                        <Link to={`/blog/${blog.id}`} className=" d-inline-block">
                                            <h2>{blog.titulo}</h2>
                                        </Link>

                                        {/* Descripción breve */}
                                        <p>{blog.descripcion_breve}</p>
                                        
                                    </div>
                                </article>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Blog;