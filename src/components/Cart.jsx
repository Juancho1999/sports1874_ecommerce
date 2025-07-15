import React, { useContext } from 'react';
import './estilos/styleCart.css';
import { CartContext } from '../context/CartContext';

const Cart = ({ isOpen, onClose }) => {
  const { cart, handleDeleteFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

  const getTotal = () => {
    return cart.reduce((acc, item) => acc + (item.precio * item.quantity), 0).toFixed(2);
  };

  return (
    <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
      <div className="cart-header">
        <h2>Carrito de Compras</h2>
        <button onClick={onClose} className="close-button">X</button>
      </div>

      <div className="cart-content">
        {cart.length === 0 ? (
          <p style={{ color: 'red' }}>El carrito está vacío</p>
        ) : (
          <>
            {cart.map((item, index) => (
             <div className="cart-item" key={item.id}>
                <img src={item.imagen} alt={item.nombre} className="cart-item-image" />
                <div className="info">
                    <p>{item.nombre}</p>
                    <p>${item.precio} x {item.quantity}</p>
                </div>

                <div className="actions">
                  <button className="qty-btn" onClick={() => decreaseQuantity(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button className="qty-btn" onClick={() => increaseQuantity(item)}>+</button>
                  <button className="trash-icono" onClick={() => handleDeleteFromCart(item)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}

            <div className="cart-footer">
              <p>Total: ${getTotal()}</p>
              <button className="btnCheckout">Finalizar Compra</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
