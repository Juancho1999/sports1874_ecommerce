import React, {useState, useContext} from 'react'

import {CartContext} from '../context/CartContext'
import {useAuth} from '../context/AuthContext'
import './Login.css' // Asegúrate de tener un archivo CSS para estilos

const Login = () => {

  const {email, setEmail, password, setPassword, handleSubmit, error} = useAuth()

  return (
    <main className="main-login">
      <div className="login-overlay">   
        <div className="login glass">
            <form  
              id="form-login" 
              onSubmit={handleSubmit}
            >
                <div className="form-input">
                    <img className="form-logo" src="../src/assets/1874.png"/>
                </div>
                <div className="form-divider">
                    <span className="circle"></span>  
                </div>
                <div className="form-input">
                  <input 
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    id="alias" 
                    placeholder="Nombre de Usuario" 
                    style={{
                      minlength:'6', 
                      maxlength:'16', 
                    }}
                    required
                    
                  />
                  {error.email && (
                  <div style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    {error.email}
                  </div>
                  )}
                </div>
                <div className="form-input">
                  <input 
                    type="password" 
                    id="clave" 
                    placeholder="Contraseña" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                       minlength:'6', 
                       maxlength:'16', 
                     }}
                  />
                  {error.password && (
                  <div style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    {error.password}
                  </div>
                  )}
                </div>

                <div className="form-input">
                  <button type='submit'>Iniciar Sesion</button>
                </div>
            </form>
        </div>
      </div>
    </main>
  );
};

export default Login
