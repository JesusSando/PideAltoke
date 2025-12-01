import React, { useEffect ,useState} from 'react';
import BlogService from "../service/BlogService"; // Importar el nuevo servicio

function AdminBlog() {
 
    const [blogEditado, setBlogEditado] = useState({
        id: 0,
        fecha: new Date().toISOString().substring(0, 10), // Fecha actual por defecto
        titulo: '',
        descripcion_breve: '',
        descripcion: '',
        descripcion_destacada: '',
        imagen: null, // Nombre del archivo guardado
        imagenFile: null, // Archivo para subir
        imagenPreview: null, // Vista previa
        autor: '',
        img_autor: null, // Nombre del archivo guardado
        img_autorFile: null, // Archivo para subir
        img_autorPreview: null, // Vista previa
        frase: '' // Corregido a 'frase'
    });

    const [editando, setEditando] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const UPLOAD_BASE_URL = "http://localhost:8080/uploads/"; 

    // --- LÓGICA DE CARGA ---

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
 
    // Cargar datos al formulario para edición
    const handleEdit = (blog) => {
        setBlogEditado({
            id: blog.id,
            fecha: blog.fecha,
            titulo: blog.titulo,
            descripcion_breve: blog.descripcion_breve,
            descripcion: blog.descripcion,
            descripcion_destacada: blog.descripcion_destacada,
            imagen: blog.imagen || null, 
            imagenFile: null, 
            imagenPreview: blog.imagen ? UPLOAD_BASE_URL + blog.imagen : null, 
            autor: blog.autor,
            img_autor: blog.img_autor || null,
            img_autorFile: null, 
            img_autorPreview: blog.img_autor ? UPLOAD_BASE_URL + blog.img_autor : null, 
            frase: blog.frese // Usar 'frase' si el backend usa 'frese'
        });
        setEditando(true);  
    };

    // Manejar cambios en campos de texto y archivos
    const handleChange = (e) => {
        const { name, value, files } = e.target;  

        if (files && files.length > 0) {
            const file = files[0];
            const tempUrl = URL.createObjectURL(file);
            
            if (name === 'imagen') {
                 setBlogEditado(prev => ({
                    ...prev,
                    imagenFile: file,
                    imagenPreview: tempUrl,
                 }));
            } else if (name === 'img_autor') {
                setBlogEditado(prev => ({
                    ...prev,
                    img_autorFile: file,
                    img_autorPreview: tempUrl,
                }));
            }
        } else {
            // Manejo de campos de texto
            setBlogEditado(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };
    
    // Guardar o Actualizar
    const handleSubmit = async (e) => {
        e.preventDefault();  
        
        const formData = new FormData();
        
        // 1. Crear el objeto Blog (JSON)
        const blogData = {
            id: blogEditado.id, 
            fecha: blogEditado.fecha,
            titulo: blogEditado.titulo,
            descripcion_breve: blogEditado.descripcion_breve,
            descripcion: blogEditado.descripcion,
            descripcion_destacada: blogEditado.descripcion_destacada,
            autor: blogEditado.autor,
            frese: blogEditado.frase,
            // Importante: Si no se sube un archivo nuevo, enviamos el nombre antiguo
            imagen: blogEditado.imagen,
            img_autor: blogEditado.img_autor,
        };

        // Adjuntar el JSON como 'blog' al FormData
        formData.append('blog', new Blob([JSON.stringify(blogData)], {
            type: "application/json"
        }));

        // 2. Adjuntar Archivos (si existen)
        if (blogEditado.imagenFile) {
            formData.append('imagen', blogEditado.imagenFile);
        }
        if (blogEditado.img_autorFile) {
            formData.append('img_autor', blogEditado.img_autorFile);
        }


        try {
            if (editando) {
                await BlogService.update(blogEditado.id, formData);
                alert(`Blog ${blogEditado.titulo} actualizado.`);
            } else {
                await BlogService.add(formData);
                alert(`Blog ${blogEditado.titulo} agregado.`);
            }

            // Recargar la lista y limpiar
            cargarBlogs();
            handleCancel(); 

        } catch (error) {
            console.error("Error al guardar blog:", error.response || error);
            alert("Error al guardar blog. Revisa la consola y el backend.");
        }
    };

    // Limpiar formulario y estado
    const handleCancel = () => {
        setBlogEditado({
            id: 0,
            fecha: new Date().toISOString().substring(0, 10),
            titulo: '',
            descripcion_breve: '',
            descripcion: '',
            descripcion_destacada: '',
            imagen: null, 
            imagenFile: null, 
            imagenPreview: null, 
            autor: '',
            img_autor: null,
            img_autorFile: null, 
            img_autorPreview: null, 
            frase: ''
        });
        setEditando(false); 
    };

    // Eliminar blog
    const handleDelete = async (id, titulo) => {
        if (window.confirm(`¿Estás seguro de eliminar el blog ${titulo}?`)) {
            try {
                await BlogService.delete(id);
                alert(`Blog ${titulo} eliminado.`);
                cargarBlogs();
            } catch (error) {
                console.error("Error al eliminar blog:", error);
                alert("Error al eliminar blog.");
            }
        }
    };

    if (loading) return <div className="container py-5 text-center">Cargando blogs...</div>;

    return (

        <div className="container"> 
            
            <div className="form-container">
                <h2>{editando ? 'Editar Blog' : 'Agregar Nuevo Blog'}</h2>
                <form onSubmit={handleSubmit}>
                    
                    {/* Campos de texto */}
                    <input name="fecha" type="date" value={blogEditado.fecha} onChange={handleChange} placeholder="Fecha (AAAA-MM-DD)" required/>
                    <input name="titulo" type="text" value={blogEditado.titulo} onChange={handleChange} placeholder="Título" required/>
                    <input name="descripcion_breve" type="text" value={blogEditado.descripcion_breve} onChange={handleChange} placeholder="Descripción Breve" required/>
                    <textarea name="descripcion" value={blogEditado.descripcion} onChange={handleChange} placeholder="Descripción Completa" required rows="5"></textarea>
                    <input name="descripcion_destacada" type="text" value={blogEditado.descripcion_destacada} onChange={handleChange} placeholder="Descripción Destacada" required/>
                    <input name="autor" type="text" value={blogEditado.autor} onChange={handleChange} placeholder="Nombre del Autor" required/>
                    <input name="frase" type="text" value={blogEditado.frase} onChange={handleChange} placeholder="Frase del Autor" required/>

                    {/* IMAGEN DEL BLOG */}
                    <label htmlFor="imagen">Imagen Principal del Blog:</label>
                    <input
                        id="imagen"
                        name="imagen"
                        type="file"
                        onChange={handleChange}
                        accept="image/*"
                    />

                    {(blogEditado.imagenPreview || blogEditado.imagen) && (
                        <div>
                            <p>Vista Previa Imagen Blog:</p>
                            <img 
                                src={blogEditado.imagenPreview || (blogEditado.imagen ? UPLOAD_BASE_URL + blogEditado.imagen : null)} 
                                alt="Imagen Blog" 
                                style={{width:'150px', height:'100px', objectFit: 'cover'}}
                            />
                        </div>
                    )}

                    {/* IMAGEN DEL AUTOR */}
                    <label htmlFor="img_autor">Imagen del Autor:</label>
                    <input
                        id="img_autor"
                        name="img_autor"
                        type="file"
                        onChange={handleChange}
                        accept="image/*"
                    />

                    {(blogEditado.img_autorPreview || blogEditado.img_autor) && (
                        <div>
                            <p>Vista Previa Imagen Autor:</p>
                            <img 
                                src={blogEditado.img_autorPreview || (blogEditado.img_autor ? UPLOAD_BASE_URL + blogEditado.img_autor : null)} 
                                alt="Imagen Autor" 
                                style={{width:'100px', height:'100px', borderRadius: '50%', objectFit: 'cover'}}
                            />
                        </div>
                    )}
                
                    {/* Botones */}
                    <button type="submit">
                        {editando ? 'Guardar Cambios' : 'Agregar Blog'}
                    </button>

                    {editando && (
                        <button type="button" onClick={handleCancel}>Cancelar</button>
                    )}
                </form>
            </div>

            <hr/>
            
            {/* Lista de Blogs */}
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
                            <button onClick={() => handleEdit(blog)}>Editar</button>
                            <button onClick={() => handleDelete(blog.id, blog.titulo)}>Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminBlog;