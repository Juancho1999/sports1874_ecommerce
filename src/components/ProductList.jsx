import React, { useContext, useRef, useState, useEffect } from 'react';
import Productos from './Productos';
import { CartContext } from '../context/CartContext';
import './estilos/styleProductos.css';
import './estilos/ProductListCarrusel.css';
import Pagination from 'react-bootstrap/Pagination';

const ProductList = ({ modo = "default" }) => {
  const { productos, busqueda, setBusqueda, productosFiltrados } = useContext(CartContext);
  const carouselRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productosFiltrados.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(productosFiltrados.length / itemsPerPage);

  const scroll = (direction) => {
    const scrollAmount = 320;
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [busqueda]);

  // Modo carrusel
  if (modo === 'carrusel') {
    const productosCarrusel = productos.slice(0, 6);

    return (
      <div className="carousel-wrapper">
        <h2 className="carousel-title">Novedades</h2>
        <div className="carousel-controls">
          <button onClick={() => scroll('left')} className="arrow-btn">◀</button>
          <div className="carousel" ref={carouselRef}>
            {productosCarrusel.map((producto) => (
              <div className="carousel-slide" key={producto.id}>
                <Productos producto={producto} />
              </div>
            ))}
          </div>
          <button onClick={() => scroll('right')} className="arrow-btn">▶</button>
        </div>
      </div>
    );
  }

  // Modo grilla con paginación
  return (
    <>
      <h2 className="product-list-title">Indumentaria</h2>
      <div className='search-container'>
        <label className='search-label'>Buscar productos: </label>
        <input
          type='text'
          placeholder='Ejemplo: remera, pantalón...'
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="list">
        {currentItems.map((producto) => (
          <Productos key={producto.id} producto={producto} />
        ))}
      </div>

      {/* PAGINACIÓN MEJORADA */}
      <Pagination className="pagination justify-content-center mt-4">
        <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
        <Pagination.Prev onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} />

        {Array.from({ length: totalPages }, (_, i) => {
          const page = i + 1;
          const isVisible =
            page === 1 || page === totalPages || Math.abs(currentPage - page) <= 1;

          const showEllipsisBefore = page === 2 && currentPage > 3;
          const showEllipsisAfter = page === totalPages - 1 && currentPage < totalPages - 2;

          return (
            <React.Fragment key={page}>
              {showEllipsisBefore && <Pagination.Ellipsis disabled />}
              {isVisible && (
                <Pagination.Item
                  active={page === currentPage}
                  aria-label={page === currentPage ? 'Página actual' : `Ir a la página ${page}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Pagination.Item>
              )}
              {showEllipsisAfter && <Pagination.Ellipsis disabled />}
            </React.Fragment>
          );
        })}

        <Pagination.Next onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} />
        <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
      </Pagination>
    </>
  );
};

export default ProductList;
