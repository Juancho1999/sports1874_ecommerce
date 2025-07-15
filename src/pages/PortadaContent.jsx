import React from 'react'
import { NavLink } from 'react-router-dom'

const PortadaContent = () => {
  return (
    <section className="hero">
        <div className="hero-content">
            <h1>La mejor ropa a un clic</h1>
            <p>Explorá nuestra tienda y descubrí productos exclusivos al mejor precio.</p>
            <NavLink to="/productos" className="btn-hero">Ver productos</NavLink>
        </div>
    </section>

  )
}

export default PortadaContent
