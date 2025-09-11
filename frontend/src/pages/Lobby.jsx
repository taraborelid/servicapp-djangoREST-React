import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/styles.css';

function Lobby() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');

useEffect(() => {
  const fetchUser = async () => {
    const token = localStorage.getItem('access');
    if (!token) {
      setFirstName('');
      return;
    }
    try {
      const response = await axios.get('http://localhost:8000/api/profile/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setFirstName(response.data.first_name);
      localStorage.setItem('token', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
    } catch (error) {
      console.error('Error al obtener datos:', error);
      setFirstName('');
    }
  };
  fetchUser();
}, []);

  {/*usamos fetchUser para obtener los datos del usuario al cargar el componente
    es una funcion asíncrona que hace una petición a la API para obtener los datos del usuario
    */}
 
  const handleLogout = async () => {
  const refresh = localStorage.getItem('refresh');
  try {
    await axios.post('http://localhost:8000/api/logout/', {
      refresh
    });
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  } finally {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/');
  }
  };


  return (

    <>
      <header>
        <div className="container nav">
          <h1>Servic</h1>
          <nav>
            <ul>
              <li><Link to="/lobby">Inicio</Link></li>
              <li><Link onClick={handleLogout}>Cerrar sesión</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      
      <main className="lobby">
        <div className="container">
          <h2>Hola {firstName}, Bienvenido a Servic</h2>
          <div className="lobby-buttons">
            
            <button onClick={() => navigate('/convertirse-trabajador')}>Convertirme en trabajador</button>
            <button onClick={() => navigate('/profile')}>Ver mi perfil</button>
            <button onClick={() => navigate('/buscar-oficios')}>Buscar oficios por ubicación</button>
            <button onClick={() => navigate('/publicar-problema')}>Publicar mi problema</button>
          </div>
        </div>
      </main>

      <footer>
        <div className="container">
          <p>© 2025 Servic. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  );
}

export default Lobby;