import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(false)
  const [isAuthenticated, setIsAuth] = useState(false)
  const [busqueda, setBusqueda] = useState("")

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

  const productosFiltrados = productos.filter((producto) => producto?.nombre.toLowerCase().includes(busqueda.toLowerCase()))

  const handleAddToCart = (producto, cantidad) => {

    const productInCart = cart.find((item) => item.id === producto.id);

    if (productInCart) {
      if (producto.stock >= (cantidad + productInCart.quantity)) {
        setCart(cart.map((item) => item.id === producto.id
          ? { ...item, quantity: item.quantity + cantidad, precio: item.precio + (cantidad * producto.precio) }
          : item)
        )
      }
      else {
        alert('No hay stock suficiente')
      }
    }
    else {
      if (producto.stock > cantidad) {
        setCart([...cart, { ...producto, quantity: cantidad, precio: producto.precio * cantidad }])
        toast.success(`El producto ${producto.nombre} se ha agregado al carrito`)
      
      }
      else {
        alert('No hay stock suficiente')
      }
    }
  }

  const handleDeleteFromCart = (product) => {
    toast.error(`El producto ${product.nombre} se ha eliminado del carrito`)
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

  const increaseQuantity = (item) => {
    const updatedCart = cart.map(product =>
      product.id === item.id ? { ...product, quantity: product.quantity + 1 } : product
    );
    setCart(updatedCart);
  };

  const decreaseQuantity = (item) => {
    const updatedCart = cart.map(product =>
      product.id === item.id && product.quantity > 1
        ? { ...product, quantity: product.quantity - 1 }
        : product
    );
    setCart(updatedCart);
  };


  return (
    <CartContext.Provider
      value={

        { cart, productos, cargando, error, handleAddToCart, handleDeleteFromCart, isAuthenticated, setIsAuth, increaseQuantity, decreaseQuantity, busqueda, setBusqueda, productosFiltrados }
      }>
      {children}
    </CartContext.Provider>
  )
}