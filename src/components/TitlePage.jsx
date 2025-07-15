import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function TitleManager() {
  const location = useLocation();

  useEffect(() => {
    // Define aquí los títulos según la ruta
    switch (location.pathname) {
      case '/':
        document.title = 'Inicio - Sport1874';
        break;
       case '/acercade':
        document.title = 'Nosotros - Sport1874';
        break;
      case '/productos':
        document.title = 'Productos - Sport1874';
        break;
      case '/contacto':
        document.title = 'Contacto - Sport1874';
        break;
      // Agrega más rutas si quieres
      default:
        document.title = 'Sport1874';
    }
  }, [location]);

  // No renderiza nada visible
  return null;
}
