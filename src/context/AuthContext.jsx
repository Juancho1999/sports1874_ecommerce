import {createContext, useContext, useState, useEffect} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import { CartContext } from './CartContext'

const AuthContext = createContext();


export const AuthProvider = ({children}) => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState({})
    const { setIsAuth } = useContext(CartContext)
    const navigate = useNavigate()
    const location = useLocation();
    
      useEffect(() => {
      const isAuthenticated = localStorage.getItem('isAuth') === 'true';
        if (isAuthenticated) {
          setIsAuth(true);
          if (location.pathname === '/login') {
            navigate('/admin');
          }
      }
  }, [location.pathname]);
  
  const handleSubmit = async (e) => {
  e.preventDefault();

  // 🔍 Validación de campos vacíos
  let validationErrors = {};
  if (!email) validationErrors.email = 'Email es requerido';
  if (!password) validationErrors.password = 'Password es requerido';

  if (Object.keys(validationErrors).length > 0) {
    setError(validationErrors);
    return;
  }

  try {
    // 📥 Leer usuarios desde JSON local
    const res = await fetch('data/users.json');
    const users = await res.json();

    // 🔍 Buscar coincidencia por email y password
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!foundUser) {
      // ❌ Si no se encontró usuario válido, mostrar error
      setError({ email: 'Credenciales inválidas' });
    } else {
      // 🧠 Mostrar en consola para depuración
      console.log('Usuario encontrado:', foundUser);

      // ✅ Guardar autenticación y datos del usuario
      setIsAuth(true);
      localStorage.setItem('isAuth', true);

      // (Opcional) Eliminar la contraseña antes de guardar en localStorage
      const { password, ...userPublicData } = foundUser;
      localStorage.setItem('userData', JSON.stringify(userPublicData));

      // 🔁 Redirigir según el rol
      if (foundUser.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  } catch (err) {
    // ⚠️ Error al cargar el archivo
    console.error('Error fetching users:', err);
    setError({
      email: 'Algo salió mal. Por favor, inténtalo de nuevo más tarde.',
    });
  }
};

 

    
    return (
        <AuthContext.Provider value={{email, setEmail, password, setPassword, handleSubmit, error}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
