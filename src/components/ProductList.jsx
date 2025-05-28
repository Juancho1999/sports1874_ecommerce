import React from 'react'
import Productos from './Productos'

const ProductList = ({ productos, agregarCarrito }) => {
    return (
        <>
            <div className="cards-container">
                    {
                        productos.map(producto => (
                            <Productos key={producto.id} producto={producto} agregarCarrito={agregarCarrito}/>
                        ))
                    }
            </div>


        </>
    )
}

export default ProductList
