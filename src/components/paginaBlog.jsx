import React, { useEffect ,useState} from 'react'; 
function PaginaBlog(){

    const [blogs, setBlog] = useState([]);
        
           useEffect(()=>{
            const cargarBlog=async()=>{
              const res=await fetch('/json/blog.json');
            if(!res.ok){
                throw new Error ('Error al cargar los usuarios');
            }
            const data = await res.json();
            setBlog(data);
        };
          cargarBlog();
           },[]);
    return(
        <>
        <section className="blog_area single-post-area section-padding">
  <div className="container">
    <div className="row">
    {blogs.map((blog)=>( 
      <div className="col-lg-8 posts-list">
        <div className="single-post">
         
          <div className="blog_details">
            <h2>{blog.titulo}
            </h2>
           
            <p>
                {blog.descripcion_breve}
            </p>
            <div className="quote-wrapper">
              <div className="quotes">
              {blog.descripcion_destacada}
              </div>
            </div>
            <p>
             {blog.descripcion}
            </p>
           
          </div>
        </div>
     
<div className="blog-author">
  <div className="media align-items-center">
    <img src={blog.img_autor} alt />
    <div className="media-body">
      <a href="#">
        <h4>{blog.autor}</h4>
      </a>
      <p>{blog.frese}</p>
    </div>
  </div>
</div>



        
       
         
      </div>
     ))}
    </div>
  </div>
</section>
</>
    );
}

export default PaginaBlog;