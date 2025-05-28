import React, {useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import Cart from '../Cart'


const Header = ({cartItems,borrarProducto, agregarCarrito}) => {
const [isCartOpen, setCartOpen] = useState(false)

  return (<>


     <header>
            <nav>
               <div className="logo">
                  <img src="../../src/assets/1874.png" alt="" />
               </div>
               <div className="menu">
                  <ul>
                    <li><Link to='/' className='link'>Home</Link></li>
                    <li><Link to='/acercade' className='link'>Sobre nosotros</Link></li>
                    <li><Link to='/productos' className='link'>Galeria de productos</Link></li>
                    <li><Link to='/contacto' className='link'>Contacto</Link></li>
                    <li className='cartnav'>
                      <button className='btnCart' onClick={()=> setCartOpen(true)}><i className="fa-solid fa-cart-shopping"></i></button>
                     <Cart borrarProducto={borrarProducto} agregarCarrito={agregarCarrito} cartItems={cartItems} isOpen={isCartOpen} onClose={()=> setCartOpen(false)}/>
                    </li>
                  </ul>
               </div>
            </nav>
      </header>
  </>)
}

export default Header
