import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/estaticos/Header';
import Footer from '../components/estaticos/Footer';
import { CartContext } from '../context/CartContext';
import './estilos/DetallesProd.css';

const DetallesProductos = () => {
  const { productos, handleAddToCart } = useContext(CartContext);
  const { id } = useParams();
  const product = productos.find((producto) => producto.id == id);

  const [cantidad, setCantidad] = useState(1);
  const incremento = () => setCantidad((prev) => (prev < product.stock ? prev + 1 : prev));
  const decremento = () => setCantidad((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <>
      <Header />
      <main className="main-container">
        {product ? 
        (
          <>
            <div className="flex-box">
              {/* Imagen del producto */}
              <div className="left">
                <div className="big-img">
                  <img src={product.imagen} alt={product.nombre} />
                </div>
                <div className="text-bottom-img">
                  <ul>
                    <li>Stock: {product.stock}</li>
                    <li>Categoría: {product.categoria}</li>
                  </ul>
                </div>
              </div>

              {/* Detalles del producto */}
              <div className="right">
                <div className="categoria">{product.categoria}</div>
                <h1>{product.nombre}</h1>

                <div className="ratings">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                  <span style={{ marginLeft: '10px', color: '#666' }}>No existen opiniones</span>
                </div>

                <div className="price">${product.precio}</div>

                <div className="cantidadContainer">
                  <button className="qtyButton" onClick={decremento}>−</button>
                  <span className="cantidad-text">{cantidad}</span>
                  <button className="qtyButton" onClick={incremento}>+</button>
                </div>

                <div className="btn-box">
                  <button
                    style={{ display: cantidad === 0 ? 'none' : 'block' }}
                    onClick={() => { handleAddToCart(product, cantidad); setCantidad(1);}}
                  >
                    AÑADIR AL CARRITO
                  </button>
                  <button disabled>
                    COMPRAR AHORA
                  </button>
                </div>
              </div>
            </div>

            {/* Descripción detallada */}
            <div className="descripcion">
              <p>{product.descripcion}</p>
            </div>
          </>
        ) :
        (
          <div className="not-found">
          <h1>¡ERROR!</h1>
          <h3>Producto no encontrado</h3>
          </div>
        )
        }
      </main>
      <Footer />
    </>
  );
};

export default DetallesProductos;
