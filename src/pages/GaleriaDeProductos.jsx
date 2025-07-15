import React, {useContext} from 'react'
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'
import ProductList from '../components/ProductList'
import loading from '../assets/loading.gif'
import { CartContext } from '../context/CartContext'


const GaleriaDeProductos = () => {

  const {cargando} = useContext(CartContext)

  return (
    <>
      <Header />
      <div className='producto-container'>
      {
        cargando ? <div className='loading-img'><img src={loading} alt='loading'  /></div> 
        :
        <ProductList />
        }
      </div>
      <Footer/>
    </>
  )
}

export default GaleriaDeProductos
