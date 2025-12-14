import { Link } from "react-router-dom";
import React, { useEffect ,useState} from 'react'; 
import BlogService from "../service/BlogService";  
import { useNavigate } from "react-router-dom";
const UPLOAD_BASE_URL = "http://98.95.19.168:8080/uploads/"; 

function Blog(){
    const navigate = useNavigate(); 
    const [blogs, setBlogs] = useState([]);  
    const [loading, setLoading] = useState(true);
 
    useEffect(()=>{
        const cargarBlog = async () => {
            setLoading(true);
            try { 
                const res = await BlogService.getAll();
                setBlogs(res.data);
            } catch (error) {
                console.error('Error al cargar los blogs:', error); 
            
            } finally {
                setLoading(false); 
            }
        };
        cargarBlog();
    }, []);

    if (loading) {
        return <section className="blog_area section-padding"><div className="container">Cargando artículos...</div></section>;
    } 
    if (blogs.length === 0) {
        return <section className="blog_area section-padding"><div className="container">No hay artículos disponibles.</div></section>;
    }


    return(
        <section className="blog_area section-padding">
            <div className="container">
                <div className="row"> 
                    {blogs.map((blog) => ( 
                        <div key={blog.id} className="col-lg-8 mb-5 mb-lg-0">
                            <div className="blog_left_sidebar">
                                
                                <article className="blog_item">
                                    <div className="blog_item_img"> 
                                        {blog.imagen && (
                                            <img 
                                                className="card-img rounded-0" 
                                                src={UPLOAD_BASE_URL + blog.imagen} 
                                                alt={blog.titulo} 
                                            />
                                        )} 
                                        <Link to={`/blog/${blog.id}`} className="d-inline-block blog_item_date">
                                            <h3>{blog.fecha}</h3>
                                        </Link>
                                    </div>
                                    
                                    <div className="blog_details"> 
                                        <Link to={`/blog/${blog.id}`} className=" d-inline-block">
                                            <h2>{blog.titulo}</h2>
                                        </Link> 
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