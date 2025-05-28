import { createContext, useState, useEffect } from "react";

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(false)
    const [isAuthenticated, setIsAuth] = useState(false)

    useEffect(() => {
        fetch('/data/data.json')
            .then(respuesta => respuesta.json())
            .then(datos => {
                setTimeout(() => {
                    setProductos(datos)
                    setCargando(false)
                }, 2000)
            })
            .catch(error => {
                console.log('Error', error)
                setCargando(false)
                setError(true)
            })

    }, [])

    const handleAddToCart = (producto, cantidad) => {

    const productInCart = cart.find((item) => item.id === producto.id);
    if (productInCart) {
      if (producto.stock >= (cantidad + productInCart.quantity)) {
        setCart(cart.map((item) => item.id === producto.id
          ? { ...item, quantity: item.quantity + cantidad, precio: item.precio + (cantidad * producto.precio) }
          : item)
        )}
        else{
          alert('No hay stock suficiente')
        }
    }
    else {
      if (producto.stock > cantidad) {
        setCart([...cart, { ...producto, quantity: cantidad, precio: producto.precio * cantidad }])
      }
      else {
        alert('No hay stock suficiente')
      }
    }
  }

    const handleDeleteFromCart = (product) => {
        setCart(prevCart => {
            return prevCart.map(item => {
                if (item.id === product.id) {
                    if (item.cantidad > 1) {
                        return { ...item, cantidad: item.cantidad - 1 };
                    } else {
                        return null; // Si quantity es 1, marcamos para eliminar
                    }
                } else {
                    return item; // Si no es el producto, lo dejamos igual
                }
            }).filter(item => item !== null); // Quitamos los productos nulos
        });
    };

    return (
        <CartContext.Provider 
        value={

            { cart, productos, cargando, error, handleAddToCart, handleDeleteFromCart, isAuthenticated,setIsAuth }
        }>
            {children}
        </CartContext.Provider>
    )
}