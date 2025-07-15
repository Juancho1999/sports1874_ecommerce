import React, { useState, useEffect } from 'react';

function FormularioEdicion({ productoSeleccionado, onActualizar, onClose }) {
  const [producto, setProducto] = useState(productoSeleccionado);

  useEffect(() => {
    setProducto(productoSeleccionado);
  }, [productoSeleccionado]);

   useEffect(() => {
    document.body.classList.add('modal-open');
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onActualizar(producto);
    onClose(); // cerrar modal al actualizar
  };

  return (
    <div className="modal-overlay">
      <form className="modal-content formulario" onSubmit={handleSubmit}>
        <button className="close-modal" onClick={onClose}>&times;</button>
        <h2 className="form-title">Editar Producto</h2>

        <label>ID:</label>
        <input type="number" name="id" value={producto.id} readOnly />

        <label>Nombre:</label>
        <input type="text" name="nombre" value={producto.nombre} onChange={handleChange} />

        <label>Precio:</label>
        <input type="number" name="precio" value={producto.precio} onChange={handleChange} />

        <label>Stock:</label>
        <input type="number" name="stock" value={producto.stock} onChange={handleChange} />

        <label>Imagen URL:</label>
        <input type="text" name="imagen" value={producto.imagen} onChange={handleChange} />

        <label>Categoría:</label>
        <input type="text" name="categoria" value={producto.categoria} onChange={handleChange} />

        <button type="submit" className="form-btn">Actualizar</button>
      </form>
    </div>
  );
}

export default FormularioEdicion;
