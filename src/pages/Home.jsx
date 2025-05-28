import React from 'react'
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'
import ProductList from '../components/ProductList'
import loading from '../assets/loading.gif'

const Home = ({ cart ,productos, cargando, agregarCarrito, borrarProducto }) => {
  return (
    <div>
      <Header agregarCarrito={agregarCarrito} borrarProducto={borrarProducto} cartItems={cart}/>
      <main className='main-container'>
        <div className="marquesina-container">
          <p className="marquesina-texto">
           <strong>
            <i className="fa fa-bomb" aria-hidden="true"></i>
            <i className="fa fa-bomb" aria-hidden="true"></i>
            ¡3 CUOTAS SIN INTERÉS EN COMPRAS SUPERIORES A $95.000!
            <i className="fa fa-bomb" aria-hidden="true"></i>
            <i className="fa fa-bomb" aria-hidden="true"></i>
            </strong>
          </p>
        </div>
        <h1>Bienvenidos a mi Tienda</h1>
        {
          cargando ? <img src={loading} style={{ marginLeft: '450px', width: '55px', height: '60px'}} alt='loading' /> :
          <ProductList agregarCarrito={agregarCarrito} productos={productos}/>
        }


      </main>



      <Footer />
    </div>
  )
}

export default Home
