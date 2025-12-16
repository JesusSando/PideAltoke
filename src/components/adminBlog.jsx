import React, { useEffect ,useState} from 'react';
import BlogService from "../service/BlogService";  

 import Swal from 'sweetalert2';

function AdminBlog() {
    const [blogEditado, setBlogEditado] = useState({
        id: null,
        fecha: new Date().toISOString().substring(0, 10),  
        titulo: '',
        descripcion_breve: '',
        descripcion: '',
        descripcion_destacada: '',
        imagen: '',   
        imagenPreview: '',  
        autor: '',
        img_autor: '',  
        img_autorPreview: '',  
        frase: ''  
    });

    const [editando, setEditando] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const rutUsuario = usuario?.rut || "Anonimo";

    const UPLOAD_BASE_URL = "http://98.95.19.168:8080/uploads/"; 

 
    const cargarBlogs = async () => { 
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

    useEffect(() => {
        cargarBlogs();
    }, []); 
    const handleEdit = (blog) => {
        setBlogEditado({
            id: blog.id,
            fecha: blog.fecha,
            titulo: blog.titulo,
            descripcion_breve: blog.descripcion_breve,
            descripcion: blog.descripcion,
            descripcion_destacada: blog.descripcion_destacada,
            imagen:  null, 
            imagenFile: null, 
            imagenPreview: blog.imagen ? UPLOAD_BASE_URL + blog.imagen : '', 
            autor: blog.autor,
            img_autor: null, 
            img_autorPreview: blog.img_autor ? UPLOAD_BASE_URL + blog.img_autor : '', 
            frase: blog.frese  
        });
        setEditando(true); 
    };
 
    const handleChange = (e) => {
        const { name, value, files } = e.target; 
        if (name === 'imagen' && files.length > 0) {
             setBlogEditado({
                 ...blogEditado,
                 imagen: files[0], //archivo
                 imagenPreview: URL.createObjectURL(files[0])
             });
        } 
        //img del autor
        else if (name === 'img_autor' && files.length > 0) {
            setBlogEditado({
                ...blogEditado,
                img_autor: files[0], //archivo 
                img_autorPreview: URL.createObjectURL(files[0])
            });
        } 
        //textos
        else { 
            setBlogEditado({
                ...blogEditado,
                [name]: value,
            });
        }
        
    }; 

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        
        const formData = new FormData(); 
        formData.append('fecha', blogEditado.fecha);
        formData.append('titulo', blogEditado.titulo);
        formData.append('descripcion_breve', blogEditado.descripcion_breve);
        formData.append('descripcion', blogEditado.descripcion);
        formData.append('descripcion_destacada', blogEditado.descripcion_destacada);
        formData.append('autor', blogEditado.autor);
        formData.append('frase', blogEditado.frase);
        formData.append('rutUsuario', rutUsuario);

        //archivo solo si nuevos
        if (blogEditado.imagen instanceof File) {
            formData.append('imagen', blogEditado.imagen);
        }
        if (blogEditado.img_autor instanceof File) {
            formData.append('img_autor', blogEditado.img_autor);
        }

        try {
            if (editando) {
                await BlogService.update(blogEditado.id, formData);
                
        
                await Swal.fire({
                        position: "top-end", 
                        icon: "success",
                        title: `Blog ${blogEditado.titulo} actualizado.`,
                        showConfirmButton: false, 
                        timer: 2000, 
                        toast: true, 
                        background: '#333',
                        color: '#fff' 
                    });
            } else {
                await BlogService.add(formData);
                await Swal.fire({
                        position: "top-end", 
                        icon: "success",
                        title: `Blog ${blogEditado.titulo} agregado`,
                        showConfirmButton: false, 
                        timer: 2000, 
                        toast: true, 
                        background: '#333',
                        color: '#fff' 
                    }); 
            } 
            cargarBlogs();
            handleCancel(); 

        } catch (error) {
            console.error("Error al guardar blog:", error.response || error);
            alert("Error al guardar blog");
        }
    }; 



    const handleCancel = () => {
        setBlogEditado({
            id: null,
            fecha: new Date().toISOString().substring(0, 10),
            titulo: '',
            descripcion_breve: '',
            descripcion: '',
            descripcion_destacada: '',
            imagen: '',  
            imagenPreview: '', 
            autor: '',
            img_autor: '', 
            img_autorPreview: '', 
            frase: ''
        });
        setEditando(false); 
    }; 


    const handleDelete = async (id, titulo) => {
        if (window.confirm(`¿Estás seguro de eliminar el blog ${titulo}?`)) {
            try {
                await BlogService.delete(id,rutUsuario); 
                await Swal.fire({
                            position: "top-end", 
                            icon: "error",
                            title: `Blog ${titulo} eliminado.`,
                            showConfirmButton: false, 
                            timer: 2000, 
                            toast: true, 
                            background: '#333',
                            color: '#fff' }); 
                cargarBlogs();
            } catch (error) {
                console.error("Error al eliminar blog:", error);
                alert("Error al eliminar blog");
            }
        }
    };

    if (loading) return <div className="container py-5 text-center">Cargando blogs...</div>;

    return (

        <div className="container"> 
            
            <div className="form-container" id='formularioEditar'>
                <h2>{editando ? 'Editar Blog' : 'Agregar Nuevo Blog'}</h2>
                <form onSubmit={handleSubmit}> 
                    <input name="fecha" type="date" value={blogEditado.fecha} onChange={handleChange} placeholder="Fecha (AAAA-MM-DD)" required/>
                    <input name="titulo" type="text" value={blogEditado.titulo} onChange={handleChange} placeholder="Título" required/>
                    <input name="descripcion_breve" type="text" value={blogEditado.descripcion_breve} onChange={handleChange} placeholder="Descripción Breve" required/>
                    <textarea name="descripcion" value={blogEditado.descripcion} onChange={handleChange} placeholder="Descripción Completa" required rows="5"></textarea>
                    <input name="descripcion_destacada" type="text" value={blogEditado.descripcion_destacada} onChange={handleChange} placeholder="Descripción Destacada" required/>
                    <input name="autor" type="text" value={blogEditado.autor} onChange={handleChange} placeholder="Nombre del Autor" required/>
                    <input name="frase" type="text" value={blogEditado.frase} onChange={handleChange} placeholder="Frase del Autor" required/>

 
                    <label htmlFor="imagen">Imagen Principal del Blog:</label>
                    <input
                        id="imagen"
                        name="imagen"
                        type="file"
                        onChange={handleChange}
                        accept="image/*"
                    />

                    {blogEditado.imagenPreview && <img src={blogEditado.imagenPreview} alt="Vista" style={{width:'100px'}} />}
                    
                    <label htmlFor="img_autor">Imagen del Autor:</label>
                    <input
                        id="img_autor"
                        name="img_autor"
                        type="file"
                        onChange={handleChange}
                        accept="image/*"
                    />
                    {blogEditado.img_autorPreview && <img src={blogEditado.img_autorPreview} alt="Vista" style={{width:'50px', borderRadius:'50%'}} />}
                 
                    <button type="submit">
                        {editando ? 'Guardar Cambios' : 'Agregar Blog'}
                    </button>

                    {editando && (
                        <button type="button" onClick={handleCancel}>Cancelar</button>
                    )}
                </form>
            </div>

            <hr/>
             
            <div className="product-list">
                <h3>Lista de Artículos del Blog</h3>
                {blogs.map((blog) => (
                    <div key={blog.id} className="product-item">

                        <div className="product-details">
                            <p><strong>{blog.titulo}</strong> (ID: {blog.id})</p>
                            <p>Fecha: {blog.fecha}</p>
                            <small>Autor: {blog.autor} ("{blog.frese}")</small>
                            <p>Descripción Breve: {blog.descripcion_breve}</p>
                        </div>
                        
                        <p>Imagen Principal:</p>
                        {blog.imagen && <img src={UPLOAD_BASE_URL + blog.imagen} alt="Blog" style={{width:'150px', height:'auto'}}/>}
                        
                        <p>Imagen Autor:</p>
                        {blog.img_autor && <img src={UPLOAD_BASE_URL + blog.img_autor} alt="Autor" style={{width:'50px', height:'50px', borderRadius: '50%', objectFit: 'cover'}}/>}
                        
                        <div className="product-actions">
                             <a href='#formularioEditar' > <button onClick={() => handleEdit(blog)}>Editar</button></a>
                            <button onClick={() => handleDelete(blog.id, blog.titulo)}>Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminBlog;