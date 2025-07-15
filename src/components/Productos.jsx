import React , {useState} from 'react'
import "./estilos/styleProductos.css";

import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Productos = ({producto}) => {

  return (<>
            <div className="listItem">
                  <img src={producto.imagen} alt="" className='listItemImage'/>
                  <span className="price">${producto.precio}</span>
                  <span className="sub">{producto.nombre}</span>
                  <span className="sub">{producto.categoria}</span>
                  <div className='listItemButton'>    
                        <Link className="btn" to={`/productos/${producto.id}`}>Ver mas</Link>
                  </div>      
            </div>  
          </>
  )
}

export default Productos
