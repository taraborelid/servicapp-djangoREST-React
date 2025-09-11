import { Link , useNavigate } from 'react-router-dom';
import '../styles/styles.css';
import { useState } from 'react';
import axios from 'axios';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        email,
        password
      });

      localStorage.setItem('token', response.data.access);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      if (response.status === 200) {
        console.log('Usuario autenticado: ', response.data);
        alert('Inicio de sesión exitoso');
        navigate('/lobby'); // Redirige correctamente
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión. Verifica tus credenciales e intenta nuevamente.');
    }
  };


  return (
    <main className="auth-container" onSubmit={handleSubmit}>
      <form className="auth-form">
        <h2>Iniciar sesión</h2>

        <label htmlFor="email">Correo electrónico</label>
        <input type="email"
          id="email"
          placeholder="tu@email.com" 
          onChange={(e) => setEmail(e.target.value)}
          required />

        <label htmlFor="password">Contraseña</label>
        <input type="password" 
          id="password" 
          placeholder="••••••••" 
          onChange={(e) => setPassword(e.target.value)}
          required />

        <button type="submit">Ingresar</button>
        <p>
          ¿No tenés cuenta? <Link to="/register">Registrate</Link>
        </p>
      </form>
    </main>
  );
}

export default Login;