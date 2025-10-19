import { Link } from "react-router-dom";

import React, { useEffect ,useState} from 'react'; 

 


function Blog(){
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
        <section className="blog_area section-padding">
  <div className="container">
    <div className="row">
        {blogs.map((blog)=>( 
      <div className="col-lg-8 mb-5 mb-lg-0">
        <div className="blog_left_sidebar">
           
          <article className="blog_item">
            <div className="blog_item_img">
              <img className="card-img rounded-0" src={blog.img} alt />
             <Link to={`/blog/${blog.id}`} className=" d-inline-block  "><a href="#" className="blog_item_date">
                <h3>{blog.fecha}</h3></a></Link>
             
               
            </div>
            <div className="blog_details">
           
       <Link to={`/blog/${blog.id}`} className=" d-inline-block  "><div><h2>{blog.titulo}</h2><h2></h2></div></Link>

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