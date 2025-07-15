import React, { useState, useEffect } from 'react';

function FormularioProducto({ onAgregar, onClose }) {
  const [producto, setProducto] = useState({
    nombre: '',
    precio: '',
    stock: '',
    imagen: '',
    categoria: '',
  });
  const [errores, setErrores] = useState({});
  
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

  const validarFormulario = () => {
    const errores = {};
    if (!producto.nombre.trim()) errores.nombre = 'El nombre es obligatorio.';
    if (!producto.precio || producto.precio <= 0) errores.precio = 'El precio debe ser mayor a 0.';
    if (!producto.stock || producto.stock <= 0) errores.stock = 'El stock debe ser mayor a 0.';
    if (!producto.categoria.trim() || producto.categoria.length < 5) errores.categoria = 'Debe tener al menos 5 caracteres.';
    if (!producto.imagen.trim()) errores.imagen = 'La URL es obligatoria.';
    setErrores(errores);
    return Object.keys(errores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;
    onAgregar(producto);
    setProducto({ nombre: '', precio: '', stock: '', imagen: '', categoria: '' });
    onClose(); // cerrar modal al agregar
  };

  return ( 
    <div className="modal-overlay" onClick={onClose}>
  <form className="modal-content formulario" onSubmit={handleSubmit}  onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>&times;</button>
        <h2 className="form-title">Agregar Producto</h2>

        <label>Nombre:</label>
        <input type="text" name="nombre" value={producto.nombre} onChange={handleChange} />
        {errores.nombre && <p style={{ color: 'red' }}>{errores.nombre}</p>}

        <label>Precio:</label>
        <input type="number" name="precio" value={producto.precio} onChange={handleChange} />
        {errores.precio && <p style={{ color: 'red' }}>{errores.precio}</p>}

        <label>Stock:</label>
        <input type="number" name="stock" value={producto.stock} onChange={handleChange} />
        {errores.stock && <p style={{ color: 'red' }}>{errores.stock}</p>}

        <label>Imagen URL:</label>
        <input type="text" name="imagen" value={producto.imagen} onChange={handleChange} />
        {errores.imagen && <p style={{ color: 'red' }}>{errores.imagen}</p>}

        <label>Categoría:</label>
        <input type="text" name="categoria" value={producto.categoria} onChange={handleChange} />
        {errores.categoria && <p style={{ color: 'red' }}>{errores.categoria}</p>}

        <button type="submit" className="form-btn">Agregar</button>
      </form>
    </div>
  );
}

export default FormularioProducto;
