import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function VerifyCommonUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identification_type: '',
    identification_number: '',
    phone_number: '',
    date_of_birth: '',
    gender: '',
    address: '',
    zip_code: '',
    city: '',
    state: '',
    country: '',
    id_front: null,
    id_back: null,
    certifications: null
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [previewFront, setPreviewFront] = useState(null);
  const [previewBack, setPreviewBack] = useState(null);
  const token = localStorage.getItem('token');

  const handleChange = e => {
    const { name, type, files, value } = e.target;
    if (type === 'file') {
      const file = files[0];
      if (name === 'id_front') setPreviewFront(file ? URL.createObjectURL(file) : null);
      if (name === 'id_back') setPreviewBack(file ? URL.createObjectURL(file) : null);
      setFormData({ ...formData, [name]: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });
    try {
      const res = await axios.post('http://localhost:8000/api/common/profile/', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage(res.data.message || 'Solicitud enviada, pendiente de revisión');
    } catch (err) {
    // Muestra el mensaje de error detallado del backend
    const errorMsg = err.response?.data
        ? JSON.stringify(err.response.data)
        : 'Error al enviar la solicitud';
    setMessage(errorMsg);
    } finally {
      setLoading(false);
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
              <li><button className="nav-btn" onClick={() => navigate('/profile')}>Volver al perfil</button></li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="verify-center">
        <div className="profile-container">
          <h2>Verificación de Usuario Común</h2>
          <p style={{marginBottom: '18px', color: '#555'}}>Por favor, ingresa tu número de identificación y sube fotos claras de tu DNI (frente y dorso). El administrador revisará tu solicitud.</p>
          <form className="profile-form" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="profile-fields">
              <label htmlFor="identification_type">Tipo de identificación</label>
              <select id="identification_type" name="identification_type" value={formData.identification_type || ''} onChange={handleChange} className="profile-select">
                <option value="">Selecciona tipo</option>
                <option value="dni">DNI</option>
                <option value="passport">Pasaporte</option>
              </select>
              <label htmlFor="identification_number">Número de identificación</label>
              <input id="identification_number" name="identification_number" value={formData.identification_number} onChange={handleChange} placeholder="Número de identificación" />
              <label htmlFor="phone_number">Teléfono</label>
              <input id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="Teléfono" />
              <label htmlFor="date_of_birth">Fecha de nacimiento</label>
              <input id="date_of_birth" name="date_of_birth" type="date" value={formData.date_of_birth} onChange={handleChange} />
              <label htmlFor="gender">Género</label>
              <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className="profile-select">
                <option value="">Selecciona género</option>
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
                <option value="other">Otro</option>
                <option value="prefer_not_to_say">Prefiero no decirlo</option>
              </select>
              <label htmlFor="address">Dirección</label>
              <input id="address" name="address" value={formData.address} onChange={handleChange} placeholder="Dirección" />
              <label htmlFor="zip_code">Código postal</label>
              <input id="zip_code" name="zip_code" value={formData.zip_code} onChange={handleChange} placeholder="Código postal" />
              <label htmlFor="city">Ciudad</label>
              <input id="city" name="city" value={formData.city} onChange={handleChange} placeholder="Ciudad" />
              <label htmlFor="state">Provincia</label>
              <input id="state" name="state" value={formData.state} onChange={handleChange} placeholder="Provincia" />
              <label htmlFor="country">País</label>
              <input id="country" name="country" value={formData.country} onChange={handleChange} placeholder="País" />
              <label htmlFor="id_front">Foto frente DNI</label>
              <input id="id_front" name="id_front" type="file" accept="image/*" onChange={handleChange} />
              {previewFront && <img src={previewFront} alt="Frente DNI" style={{maxWidth: '120px', marginBottom: '10px', borderRadius: '6px'}} />}
              <label htmlFor="id_back">Foto dorso DNI</label>
              <input id="id_back" name="id_back" type="file" accept="image/*" onChange={handleChange} />
              {previewBack && <img src={previewBack} alt="Dorso DNI" style={{maxWidth: '120px', marginBottom: '10px', borderRadius: '6px'}} />}
            </div>
            <button className="profile-save" type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Enviar solicitud'}</button>
          </form>
          {message && <div style={{marginTop: '18px', color: '#007bff'}}>{message}</div>}
        </div>
      </div>
    </>
  );
}

export default VerifyCommonUser;
