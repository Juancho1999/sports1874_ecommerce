import React, { useContext, useRef, useState, useEffect } from 'react';
import Productos from './Productos';
import { CartContext } from '../context/CartContext';
import './estilos/styleProductos.css';
import './estilos/ProductListCarrusel.css';
import Pagination from 'react-bootstrap/Pagination'; // Importamos el componente de paginación


const ProductList = ({ modo = "default" }) => { // Recibe una prop para definir el tipo de visualización
  const { productos, busqueda, setBusqueda, productosFiltrados } = useContext(CartContext); // Extraemos los productos del contexto
  const carouselRef = useRef(null); // Referencia al contenedor del carrusel para manejar el scroll


  const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual

  const itemsPerPage = 4; // Cantidad de productos por página

  const indexOfLastItem = currentPage * itemsPerPage; // Índice del último producto de la página actual
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // Índice del primer producto de la página actual
  const currentItems = productosFiltrados.slice(indexOfFirstItem, indexOfLastItem); // Productos de la página actual

  const totalPages = Math.ceil(productosFiltrados.length / itemsPerPage); // Total de páginas

  // Función para hacer scroll horizontal
  const scroll = (direction) => {
    const scrollAmount = 320; // Cantidad de píxeles a mover
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount, // Dirección del scroll
        behavior: 'smooth' // Animación suave
      });
    }
  };

  useEffect(() => {
  setCurrentPage(1); // Cada vez que cambia la búsqueda, volvemos a la página 1
}, [busqueda]);


  // Si se recibe "modo=carrusel", renderizamos el carrusel
  if (modo === 'carrusel') {
    const productosCarrusel = productos.slice(0, 6); // mostrar solo los primeros 6

    return (
      <div className="carousel-wrapper">
        <h2 className="carousel-title">Novedades</h2>
        <div className="carousel-controls">
          {/* Flecha izquierda */}
          <button onClick={() => scroll('left')} className="arrow-btn">◀</button>

          {/* Contenedor deslizable */}
          <div className="carousel" ref={carouselRef}>
            {productosCarrusel.map((producto) => (
              <div className="carousel-slide" key={producto.id}>
                <Productos producto={producto} />
              </div>
            ))}
          </div>

          {/* Flecha derecha */}
          <button onClick={() => scroll('right')} className="arrow-btn">▶</button>
        </div>
      </div>
    );
  }

  // Si no es modo carrusel, mostramos la lista normal (grilla)
  return (
    <>
      <h2 className="product-list-title">Indumentaria</h2>
      {/* Contenedor de búsqueda */}
      <div className='search-container'>
        <label className='search-label'>Buscar productos: </label>
        <input
          type='text'
          placeholder='Buscar productos...'
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>
      <div className="list">
        {currentItems.map((producto) => (
          <Productos key={producto.id} producto={producto} />
        ))}
      </div>
      {/* Paginación */}
      <Pagination className="pagination">
        <Pagination.Prev onClick={() => setCurrentPage( p => Math.max(p-1, 1) )} disabled={currentPage === 1} />
        {
        Array.from({length:totalPages}, (_, i) => (
          <Pagination.Item
            key={i + 1}
            active={i + 1 === currentPage}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => setCurrentPage(p => Math.min(p+1, totalPages) )} disabled={currentPage === totalPages} />
      </Pagination>
    </>
  );
};

export default ProductList;
