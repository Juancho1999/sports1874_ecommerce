import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AdminContext } from "../context/AdminContext";
import "./admin.css";

import FormularioProducto from "../components/FormularioProducto";
import FormularioEdicion from "../components/FormularioEdicion";
import Sidebar from "../components/Sidebar"; // componente de menú lateral

const Admin = () => {
  const { setIsAuth } = useContext(CartContext);

  const {
    products,
    loading,
    open,
    setOpen,
    openEditor,
    setOpenEditor,
    seleccionado,
    setSeleccionado,
    agregarProducto,
    actulizarProducto,
    eliminarProducto,
  } = useContext(AdminContext);

  const navigate = useNavigate();

  return (
    <div className="admin-layout">
      <Sidebar setIsAuth={setIsAuth} /> {/* Menú lateral */}
      <div className="admin-content">
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <>
            <h1 className="title">Panel Administrativo</h1>
            <ul className="list">
              {products.map((product) => (
                <li key={product.id} className="listItem">
                  <img
                    src={product.imagen}
                    alt={product.nombre}
                    className="listItemImage"
                  />
                  <div className="listItemContent">
                    <span className="price">${product.precio}</span>
                    <span className="sub nombre">{product.nombre}</span>
                    <span className="sub categoria">{product.categoria}</span>
                  </div>
                  <div className="card-actions">
                    <button
                      className="editButton"
                      onClick={() => {
                        setOpenEditor(true);
                        setSeleccionado(product);
                      }}
                    >
                      <i className="fas fa-edit"></i> Editar
                    </button>
                    <button
                      className="deleteButton"
                      onClick={() => eliminarProducto(product.id)}
                    >
                      <i className="fas fa-trash"></i> Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
        <button className="btnAgregar" onClick={() => setOpen(true)}>
          <i className="fas fa-plus-circle"></i>
          <span> Agregar producto</span>
        </button>
        {open && (
          <FormularioProducto
            onAgregar={agregarProducto}
            onClose={() => setOpen(false)}
          />
        )}
        {openEditor && (
          <FormularioEdicion
            productoSeleccionado={seleccionado}
            onActualizar={actulizarProducto}
            onClose={() => setOpenEditor(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Admin;
