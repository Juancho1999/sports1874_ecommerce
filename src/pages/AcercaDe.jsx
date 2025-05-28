import React from 'react'
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'
import about from '../assets/about.png'
import './AcercaDe.css'

const AcercaDe = ({ cart, borrarProducto }) => {
  return (
    <>
      <Header borrarProducto={borrarProducto} cartItems={cart} />
      <main className="main-container acerca-de-container">
        <img src={about} alt="Nosotros" className="about-image" />
        <section className="about-text">
          <p>
            En <strong>Sport1784</strong> nos dedicamos a la venta de ropa en excelente estado, seleccionada con cuidado para ofrecerte calidad, estilo y precio justo.
          </p>
          <p>
            Trabajamos con marcas reconocidas a nivel mundial como <strong>Polo Ralph Lauren</strong>, <strong>Nautica</strong>, <strong>Nike</strong>, <strong>Tommy Hilfiger</strong>, entre otras.
          </p>
          <p>
            Nuestro compromiso es acercarte prendas únicas que te representen, manteniendo un enfoque sostenible y responsable con el consumo. Creemos que vestir bien no tiene por qué ser costoso ni perjudicial para el planeta.
          </p>
          <p>
            Te invitamos a descubrir nuestro catálogo y sumarte a una comunidad que valora la moda consciente y el estilo auténtico.
          </p>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default AcercaDe
