import React, { useContext } from 'react'
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'
import PortadaContent from './PortadaContent'
import ProductList from '../components/ProductList'
import loading from '../assets/loading.gif'
import { CartContext } from '../context/CartContext'



const Home = () => {

  const { cart, productos, cargando, error, handleAddToCart, handleDeleteFromCart, isAuthenticated } = useContext(CartContext)

  return (
    <>
      <Header />
      <main className='main-container'>
        <PortadaContent/>
        {
          cargando ? <img src={loading} style={{ marginLeft: '450px', width: '55px', height: '60px'}} alt='loading' /> :
          <ProductList modo="carrusel" agregarCarrito={handleAddToCart} productos={productos}/>
        }
      </main>



      <Footer />
    </>
  )
}

export default Home
