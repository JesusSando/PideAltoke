import React from 'react';



function IniciarSesion() {
    return (
       <div>
  <div className="caja-fondo" style={{zIndex: -1, height: '100%'}}>
    <img src="images/hero-bg.jpg" alt />
  </div>
  {/* Inicio de Sesión */}
  <div className="contenedor">
    <div className="formulario" id="inicio-sesion">
      <h2 className="titulo">Inicio de sesión</h2>
      <form action="index.html.html" method="post" onsubmit="return redirigirFormulario()">
        <label htmlFor="email">Correo</label>
        <input type="email" id="email" name="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Ingresa un correo válido. Ejemplo: usuario@dominio.com" />
        <label htmlFor="contraseña">Contraseña</label>
        <input type="password" id="contraseña" name="contraseña" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}" title="Debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo." />
        <button type="submit" className="enviar">Iniciar Sesión</button>
      </form>
      <button className="iniGoogle"><a href="https://workspace.google.com/intl/es-419/gmail/">Iniciar sesion con Google</a></button>
      <button onclick="mostrarRegistro()" className="enviar2">Registrarse</button>
      <a href="#" className="olvidaste" onclick="verificar()">¿Olvidaste tu contraseña?</a>
    </div>
    {/* Registro */}
    <div className="formulario" id="registro" style={{display: 'none', marginTop: 180}}>
      <h2 className="titulo">Registrarse</h2>
      <form onsubmit="mostrarInicioSesion()" method="post">
        <label htmlFor="usuario">Usuario</label>
        <input type="text" id="usuario" name="usuario" required />
        <label htmlFor="emailRegistro">Correo</label>
        <input type="email" id="emailRegistro" name="emailRegistro" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Ingresa un correo válido. Ejemplo: usuario@dominio.com" />
        <label htmlFor="rut">RUT</label>
        <input type="text" id="rut" name="rut" required pattern="^(\d{1,2}\.?\d{3}\.?\d{3}-[\dkK])$" title="Formato válido: 12.345.678-9 o 12345678-9" />
        <label htmlFor="comuna">Comuna</label>
        <input type="text" id="comuna" name="comuna" required />
        <label htmlFor="contraseñaReg">Contraseña</label>
        <input type="password" id="contraseñaReg" name="contraseña" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}" title="Debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo." />
        <label htmlFor="contraseñaRepetir">Repetir Contraseña</label>
        <input type="password" id="contraseñaRepetir" name="contraseñaRepetir" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}" title="Debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo." />
        <button type="submit" className="enviar">Registrarse</button>
      </form>
      <button className="iniGoogle"><a href="https://workspace.google.com/intl/es-419/gmail/">Iniciar sesion con Google</a></button>
      <a href="#" className="olvidaste" onclick="verificar()">¿Olvidaste tu contraseña?</a>
    </div>
    {/* Enviar Código */}
    <div className="formulario" id="enviarCodigo" style={{display: 'none'}}>
      <h2 className="titulo">Recuperar Contraseña</h2>
      <p>Introduce el código de recuperación</p>
      <form onsubmit="return continuar()" method="post">
        <label htmlFor="emailRecuperacion">Correo</label>
        <input type="email" id="emailRecuperacion" name="emailRecuperacion" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Ingresa un correo válido. Ejemplo: usuario@dominio.com" />
        <button type="submit" className="enviar2">Continuar</button>
      </form>
    </div>
    {/* Verificación */}
    <div className="formulario" id="verificacion" style={{display: 'none'}}>
      <h2 className="titulo">Verificación</h2>
      <p>Introduce el código</p>
      <form onsubmit="return nuevaContraseña()" method="post">
        <label htmlFor="codigoVerificacion">Código</label>
        <input type="text" id="codigoVerificacion" name="codigoVerificacion" required />
        <button type="submit" className="enviar">Continuar</button>
      </form>
    </div>
    {/* Nueva Contraseña */}
    <div className="formulario" id="nuevaContraseña" style={{display: 'none'}}>
      <h2 className="titulo">Nueva contraseña</h2>
      <form onsubmit="aceptar()" method="post">
        <label htmlFor="nueva">Nueva contraseña</label>
        <input type="password" id="nueva" name="nueva" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}" title="Debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo." />
        <label htmlFor="nuevaRepetir">Repite la nueva contraseña</label>
        <input type="password" id="nuevaRepetir" name="nuevaRepetir" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}" title="Debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo." />
        <button type="submit" className="enviar2">Aceptar</button>
      </form>
    </div>
  </div>
  {/* jQery */}
  {/* popper js */}
  {/* bootstrap js */}
  {/* owl slider */}
  {/* isotope js */}
  {/* nice select */}
  {/* custom js */}
</div>

    );
}

export default IniciarSesion;