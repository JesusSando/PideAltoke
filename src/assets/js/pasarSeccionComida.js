function PasarSeccionComida(){
    const filtrarComida=document.querySelectorAll('.filtro_menu li');
    const todaComida=document.querySelectorAll('.contenido_filtro .row .all');

    filtrarComida.forEach(comida =>{
        comida.addEventListener('click',function(){
            const filtro=comida.getAttribute('data-filter');

            filtrarComida.forEach(i=>i.classList.remove('active'));
            comida.classList.add('active');

            todaComida.forEach(producto=>{
                const clases=producto.classList;
                if(filtro=='*' || clases.contains(filtro.replace('.',''))){
                    producto.style.display='block'
                }else{
                    producto.style.display='none'
                }
            })
        })
    })
    
}

export default PasarSeccionComida;