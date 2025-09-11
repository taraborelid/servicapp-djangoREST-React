import { useState } from 'react';
import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';
import '../styles/styles.css';

function Register() {
  {
    /* 
      useState es un hook de React que permite manejar el estado dentro de un componente funcional 
      un hook es una función que permite a los componentes funcionales de React tener estado y otras características de los componentes de clase.
      un componente es una función que retorna un elemento de React, que puede ser un elemento HTML o JSX.
      firstName guarda el valor actual del input nombre, setFirstname es una función que actualiza ese valor.
      useState recibe un valor inicial y retorna un array con dos elementos: el valor actual del estado y una función para actualizarlo.
      useState es como un contenedor que guarda un valor y te permite actualizarlo.
    */
  }
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const navigate = useNavigate();

  {
    /* 
      e es el evento que se dispara al enviar el formulario a la API.
      preventDefault() evita que el formulario se envíe de la manera tradicional, lo que recargaría la página.
      axios es una librería que permite hacer peticiones HTTP de manera sencilla.
      post es un método de axios que envía datos al servidor.
      e forma parte de la API de eventos de JavaScript axios, que permite manejar eventos como clics, envíos de formularios, etc.
      se creo en el 2014 por Matt Zabriskie y es una de las librerías más populares para hacer peticiones HTTP en JavaScript.
      la libreria se llama axios porque es una librería basada en Promesas que permite hacer peticiones HTTP de manera sencilla y rápida.
    */
  }
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

      {
        /* 
          form es un elemento HTML que permite enviar datos al servidor.
          className es un atributo que permite agregar clases CSS a un elemento HTML.
          onSubmit es un evento que se dispara al enviar el formulario.
          handleSubmit es una función que se ejecuta al enviar el formulario.
        */
      }
      <form className="auth-form" onSubmit= {handleSubmit}>
        <h2>Crear cuenta</h2>
        
        {
        /* 
          label es un elemento HTML que permite asociar un texto a un input.
          htmlFor es un atributo que permite asociar un label a un input por su id.
          input es un elemento HTML que permite ingresar datos.
          type es un atributo que define el tipo de input (text, email, password, etc.).
          value es un atributo que define el valor actual del input. 
          el valor value debe ser el mismo que definimos en useState para que el input sea controlado.
          onChange es un evento que se dispara al cambiar el valor del input.
          placeholder es un atributo que muestra un texto de ayuda dentro del input.
          required es un atributo que indica que el input es obligatorio.
        */
        }

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

        {
        /* 
          Se dispara el evento onSubmit al hacer clic en el botón "Registrarse".
        */
        }
        <button type="submit">Registrarse</button>
        <p>¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link></p>
      </form>
    </main>
  );
}

export default Register;