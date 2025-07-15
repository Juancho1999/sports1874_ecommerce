import React, { useState, useContext, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import './Header.css';
import Cart from '../Cart';
import imagen from '../../assets/1874.png';

const Header = () => {
  
  const { cart } = useContext(CartContext);
  
  const [isCartOpen, setCartOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);


  // 🔁 Cierra menú al navegar a otra página
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // 🔽 Cierra menú al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      setMenuOpen(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header> 
      <div className="marquesina-container">
          <p className="marquesina-texto">
           <span>
            <i className="fa fa-bomb" aria-hidden="true"></i>
            <i className="fa fa-bomb" aria-hidden="true"></i>
            ¡3 CUOTAS SIN INTERÉS EN COMPRAS SUPERIORES A $95.000!
            <i className="fa fa-bomb" aria-hidden="true"></i>
            <i className="fa fa-bomb" aria-hidden="true"></i>
            </span>
          </p>
        </div>
      <nav className="navbar">
        <div className="logo">
          <imagen />
        </div>

        <div className="menu-icon" onClick={() => setMenuOpen(!isMenuOpen)}>
          <i className="fas fa-bars"></i>
        </div>

        <ul className={`menu ${isMenuOpen ? 'active' : ''}`}>
          <li><NavLink to="/" className="link">Home</NavLink></li>
          <li><NavLink to="/acercade" className="link">Sobre nosotros</NavLink></li>
          <li><NavLink to="/productos" className="link">Galería de productos</NavLink></li>
          <li><NavLink to="/contacto" className="link">Contacto</NavLink></li>
          <li className="cartnav">
            <button className="btnCart" onClick={() => setCartOpen(true)}>
              <div className="cart-icon-container">
                <i className="fa-solid fa-cart-shopping"></i>
                {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
              </div>
            </button>
            <Cart isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
