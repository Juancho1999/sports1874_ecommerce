import React from 'react'
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'
import './Contactos.css'

const Contactos = ({ cart, borrarProducto }) => {
  return (
    <>
      <Header borrarProducto={borrarProducto} cartItems={cart} />
      <main className="main-container contactos-container">
        <div className="contact-columns">
          {/* Columna 1 - MAIL */}
          <div className="contact-column">
            <h3>MAIL</h3>
            <p>Por consultas o solicitudes sobre compras en la tienda online, escribinos a: <br />
              <a href="mailto:info@sport1874.com">info@sport1874.com</a>
            </p>
            <p>Por consultas, reclamos, autorizaciones o solicitudes sobre los locales, escribinos a: <br />
              <a href="mailto:info@sport1874.com">info@sport1874.com</a>
            </p>
          </div>

          {/* Columna 2 - WHATSAPP */}
          <div className="contact-column">
            <h3>WHATSAPP</h3>
            <a href="https://wa.me/5491234567890" target="_blank" rel="noopener noreferrer" className="whatsapp-button">
              INICIAR CHAT
            </a>
          </div>

          {/* Columna 3 - REDES SOCIALES */}
          <div className="contact-column">
            <h3>REDES SOCIALES</h3>
            <p>Seguinos en nuestras redes para enterarte de todas las novedades y campañas en curso.</p>
            <p>@galponderopa</p>
            <div className="social-icons">
              <a href="#"><i className="fa-brands fa-linkedin"></i></a>
              <a href="#"><i className="fa-brands fa-instagram"></i></a>
              <a href="#"><i className="fa-brands fa-whatsapp"></i></a>
              <a href="#"><i className="fa-brands fa-tiktok"></i></a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Contactos
