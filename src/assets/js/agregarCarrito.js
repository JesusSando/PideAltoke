export function agregarAlCarrito(producto) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

 
    const existe = carrito.find(p => p.id === producto.id); 

    
    const precioFinal = producto.oferta ? producto.precioOferta : producto.precio; 
    const imagenCarrito = producto.img_oferta || producto.img || "/src/assets/images/f1.png";


    if (existe) {
        existe.cantidad += 1;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: precioFinal, 
            img: imagenCarrito, 
            cantidad: 1
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`${producto.nombre} agregado al carrito`);
}