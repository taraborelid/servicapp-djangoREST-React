import { useState } from 'react';
import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';
import '../styles/styles.css';

function Register() {
  
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/register/', {
        email, 
        password,
        password2,
        first_name : firstName,
        last_name: lastName
      });
      if (response.status === 201) {
        console.log('Usuario registrado: ', response.data);
        alert('Cuenta creada exitosamente');
        navigate('/login');
      }
    } catch (error) { 
      console.error('Error al registrar el usuario:', error);
      alert('Error al crear la cuenta. Intenta nuevamente.');
    }
    
  };


  return (
    <main className="auth-container">

      
      <form className="auth-form" onSubmit= {handleSubmit}>
        <h2>Crear cuenta</h2>
        
        <label htmlFor='firstName'>Nombre: </label>
        <input
          type='text'
          id='firstName'
          value={firstName}
          onChange={(e) => setFirstname(e.target.value)}
          placeholder='Juan Perez'
          required
        />

        <label htmlFor='lastName'>Apellido: </label>
        <input
          type='text'
          id='lastName'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder='Gomez'
          required
        />

        <label htmlFor='email'>Email: </label>
        <input
          type='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor='password'>Contraseña: </label>
        <input
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='********'
          required
        />

        <label htmlFor='password2'>Repetir contraseña: </label>
        <input
          type='password'
          id='password2'
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          placeholder='********'
          required
        />

        
        <button type="submit">Registrarse</button>
        <p>¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link></p>
      </form>
    </main>
  );
}

export default Register;