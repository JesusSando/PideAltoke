import React from 'react'; 

function Nosotros() {
    return (
 
  <section className="seccion_sobre relleno_diseño">
    <div className="container">
      <div className="row">
        <div className="col-md-6 ">
          <div className="caja-img">
            <img src="images/f6.png" alt />
          </div>
        </div>
        <div className="col-md-6">
          <div className="detalle-caja">
            <div className="heading_container">
              <h2>
                Sobre Nosotros
              </h2>
            </div>
            <p>
              Somos una empresa dedicada a la venta de comida rápida, con más de 10 años en el mercado.
            </p>
            <p>
              Nos enorgullece ofrecer productos de alta calidad y un servicio al cliente excepcional. Nuestro objetivo es
              satisfacer las necesidades de nuestros clientes y superar sus expectativas en cada visita.
            </p>
            <p>
              En nuestra tienda, encontrarás una amplia variedad de opciones de comida rápida, desde hamburguesas jugosas
              hasta pizzas recién horneadas y papas fritas crujientes. Utilizamos ingredientes frescos y de calidad para
              garantizar que cada bocado sea delicioso y satisfactorio.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

    );
}

export default Nosotros;