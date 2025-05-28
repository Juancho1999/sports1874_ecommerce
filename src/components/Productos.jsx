import React , {useState}from 'react'
import './styleProductos.css'
import { Link } from 'react-router-dom';
const Productos = ({producto,agregarCarrito}) => {

  const [cantidad, setCantidad] = useState(1);

  const increase = () => setCantidad(prev => (prev < product.stock ? prev + 1 : prev));
  const decrease = () => setCantidad(prev => (prev > 1 ? prev - 1 : 1));

  return (
            <div className="card">
                <div className='imganContainer'>
                  <img src={producto.imagen}alt="" className='imagen'/>
                </div>
                <div className="card-content">
                    <h4 className="card-title mt-3">{producto.nombre}</h4>
                    <h5 className="card-title">${producto.precio}</h5>
                    <Link className='btn' to={`/productos/${producto.id}`}>Ver mas</Link>
                </div>
            </div>
  )
}

export default Productos
