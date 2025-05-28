import React, {useState, useContext} from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'
import { CartContext } from '../context/CartContext'
import './DetallesProd.css'


const DetallesProductos = ({productos, cart, borrarProducto, agregarCarrito}) => {
     console.log(productos);
    
  const {handleAddToCart } = useContext(CartContext)

    const {id} = useParams()
  
    const product = productos.find(producto => producto.id == id)

      const [cantidad, setCantidad] = useState(1);
      const incremento = () => setCantidad(prev => (prev < product.stock ? prev + 1 : prev));
      const decremento = () => setCantidad(prev => (prev < 1 ? prev - 1 : 1));  

  return (
    <>
    <Header borrarProducto={borrarProducto} agregarCarrito={agregarCarrito} cartItems={cart}/>
      <main className='main-container'>
      <h1>{product.nombre}</h1>
      {product ? (
        <div className="flex-box">
          <div className="left">
            <div className="big-img">
              <img src={product.imagen} alt={product.nombre} />
            </div>
            <div className="text-bottom-img">
              <ul>
                <li>Stock: {product.stock}</li>
                <li>Descripción: {product.categoria}</li>
              </ul>
            </div>
          </div>
        <div className="right">
          <div className="ratings">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star-half-alt"></i>
          </div>
          <div className="price">Precio: ${product.precio}</div>
          <div className="size">
            <span>Tamaño: </span>
              <div className="psize">S</div>
              <div className="psize">M</div>
              <div className="psize">L</div>
              <div className="psize" >XL</div>
          </div>
           <div className='cantidadContainer'>
            <button className='qtyButton' onClick={decremento}>-</button>
            <span className="cantidad-text">{cantidad}</span>
            <button className='qtyButton' onClick={incremento}>+</button>
        </div>
        <div className="btn-box">
         <button style={{display: cantidad == 0 ? 'none' : 'block'}}onClick={() => { agregarCarrito(product, cantidad)}}>Agregar al carrito</button>
        </div>
        
        </div>  
        </div>
        ):
        (<p>Producto no encontrado</p>)}
      </main>
    <Footer />
  </>)
}

export default DetallesProductos
