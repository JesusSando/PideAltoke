export function agregarAlCarrito(producto) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const cantidadAgregar = producto.cantidad || 1;
    const existe = carrito.find((item) => item.id === producto.id); 


    if (existe) {
        existe.cantidad += cantidadAgregar;
    } else {
        carrito.push({
            id: producto.id,
            idOriginal: producto.idOriginal || producto.id,
            nombre: producto.nombre,
            imagen: producto.imagen || producto.img,
            precio: producto.precio, 
            cantidad: cantidadAgregar,
            tipoComida: producto.tipoComida,
            customizacion: producto.customizacion || null
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`${producto.nombre} agregado al carrito`);
    window.dispatchEvent(new Event("storage"));
}