import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom"; 
import "./estilos/Sidebar.css"; // Asegurate de crearlo con este nombre

const Sidebar = ({ onLogout, onAgregarClick }) => {
  const [colapsado, setColapsado] = useState(false);

  const [userData, setUserData] = useState({ nombre: '', role: '' });

  const { setIsAuth } = useContext(CartContext)
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      const parsed = JSON.parse(data);
      setUserData(parsed);
    }
  }, []);

  return (
    <div className={`admin-sidebar ${colapsado ? "collapsed" : ""}`}>
      {/* Botón hamburguesa */}
      <div className="logo">
          <img src="../../src/assets/1874.png" alt="logo" />
      </div>

      {/* Info del usuario }
      <div className="usuario">
        <img
          src="https://i.pravatar.cc/"
          alt="avatar"
          className="avatar"
        />
        {!colapsado && (
          <>
            <span className="nombre">{userData.nombre}</span>
            <span className="rol">{userData.role}</span>
          </>
        )}
      </div>*/}

      {/* Opciones de navegación */}
      <nav>
        <ul className="admin-menu">
          <li>
            <NavLink to="/admin">
              <i className="fas fa-home"></i>
              {!colapsado && <span>Inicio</span>}
            </NavLink>
          </li>
          <li>
            <button onClick={onAgregarClick}>
              <i className="fas fa-shopping-cart"></i>
              {!colapsado && <span>Go Ecommerce</span>}
            </button>
          </li>
          <li>
            <button>
              <i className="fas fa fa-user"></i>
              {!colapsado && <span>Mi cuenta</span>}
            </button>
          </li>
        </ul>
      </nav>

      {/* Cerrar sesión */}
      <div className="logout">
        <button onClick={() => {setIsAuth(false);
                                navigate('/');
                                localStorage.removeItem('isAuth');
                                }}>
          <i className="fas fa-sign-out-alt"></i>
          {!colapsado && <span>Cerrar sesión</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
