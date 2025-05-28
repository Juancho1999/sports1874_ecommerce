import React from 'react'
import './styleCart.css'



const Cart = ({ isOpen, onClose, cartItems, borrarProducto }) => {

     // Función que calcula el total del carrito con validación de datos
    const getTotal = () => {
        return cartItems.reduce((acc, item) => acc + parseFloat(item.precio || 0), 0).toFixed(2);
    };
     
    return (
        <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
            <div className='cart-header'>
                <h2 style={{ color: 'black' }}>Carrito de Compras</h2>
                <button onClick={onClose} className='close-button'>X</button>
            </div>
            <div className='cart-content'>
                {cartItems.length === 0 ? (<p style={{ color: 'red' }}>El carrito esta vacío</p>) 
                : 
                (<><ul className='cart-item'>
                    {cartItems.map((item, index) => (
                        	<div key={index} >
								<li key={item.id} style={{ fontSize: '14px', color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }} >
									<div style={{ display: 'flex', textAlign: 'start' }}>
										<div >
											<p>{item.quantity}x {item.nombre} </p>
										</div>
										<div>
                                            <p>- ${item.precio}</p>
                                        </div>
									</div>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <button onClick={() => borrarProducto(item)}><i className="fa-solid fa-trash"></i></button>
                                    </div>
                                </li>
                            </div>
                    ))}
                </ul>
                     <div className='cart-footer'>
                        <p style={{ color: 'blue' }}>Total: ${getTotal()}</p>
                        <button className='btnCheckout'>Finalizar Compra</button>
                    </div>
                </>)}

            </div>

        </div>
    )
}

export default Cart
