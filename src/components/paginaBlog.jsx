import React, { useEffect ,useState} from 'react'; 
 
import { useParams } from 'react-router-dom';
import BlogService from "../service/BlogService";



function PaginaBlog(){
  const UPLOAD_BASE_URL = "http://98.95.19.168:8080/uploads/";
  const IMG_AUTOR_DEFAULT = "../src/assets/images/carrusel5.jpg";

    const { id } = useParams();  
    const [blog, setBlog] = useState(null); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarBlog = async () => {
            setLoading(true);
            try { 
                const res = await BlogService.getById(id); 
                setBlog(res.data);
            } catch (error) {
                console.error(`Error al cargar el blog con ID ${id}:`, error);
                setBlog(null); 
            } finally {
                setLoading(false); 
            }
        }; 
        if (id) {
            cargarBlog();
        }

    }, [id]); 

    if (loading) return <div className="container py-5 text-center">Cargando artículo...</div>;
    if (!blog) return <div className="container py-5 text-center">Artículo no encontrado.</div>; 

    
    return(
          <>
        <section className="blog_area single-post-area section-padding">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 posts-list">
                        <div className="single-post">
                            {blog.imagen && (
                                <div className="feature-img">
                                    <img 
                                        className="img-fluid" 
                                        src={UPLOAD_BASE_URL + blog.imagen} 
                                        alt={blog.titulo} 
                                    />
                                </div>
                            )}
                            
                            <div className="blog_details">
                                <h2>{blog.titulo}</h2>
                                <p>{blog.descripcion_breve}</p>
                                <div className="quote-wrapper">
                                    <div className="quotes">
                                        {blog.descripcion_destacada}
                                    </div>
                                </div>
                                <p>{blog.descripcion}</p>
                            </div>
                        </div>
                    
                        <div className="blog-author">
                            <div className="blog-author">
                        <div className="media align-items-center">
                              <img  
                                src={blog.img_autor ? UPLOAD_BASE_URL + blog.img_autor : IMG_AUTOR_DEFAULT} 
                                alt={blog.autor || "Autor Desconocido"} 
                            />
                            <div className="media-body"> 
                                <h4>{blog.autor}</h4>
                                <p>{blog.frase}</p>  
                            </div>
                        </div>
                      </div>
                        </div>
                    </div> 
                  </div>
                </div>
             </section>
        </>
    );
}

export default PaginaBlog;