import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { fetchVerificationStatus } from '../utils/profileApi';

function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    date_of_birth: '',
    gender: '',
    address: '',
    zip_code: '',
    city: '',
    state: '',
    country: '',
    password: '',
    password2: ''
  });
  const [isVerified, setIsVerified] = useState(false);
  const [isProviderVerified, setIsProviderVerified] = useState(false);
  const [activeTab, setActiveTab] = useState('datos-personales');

  const token = localStorage.getItem('token');
  
  //obtenemos datos del perfil para mostrar en el formulario
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/profile/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
        setFormData(f => ({ ...f, ...response.data }));
      } catch (err) {
        setError('No se pudo cargar el perfil.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);
  
  // consultamos a api/common/profile/ para ver si el usuario fue verificado
  useEffect(() => {
    async function checkVerifications() {
      const commonVerified = await fetchVerificationStatus('http://localhost:8000/api/common/profile/', token);
      setIsVerified(commonVerified);
      const providerVerified = await fetchVerificationStatus('http://localhost:8000/api/provider/profile/', token);
      setIsProviderVerified(providerVerified);
    }
    checkVerifications();
  }, [token]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const dataToSend = { ...formData };
    if (!formData.password && !formData.password2) {
      delete dataToSend.password;
      delete dataToSend.password2;
    }
    axios.put('http://localhost:8000/api/profile/edit/', dataToSend, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      alert('Datos actualizados correctamente');
      setFormData({ ...formData, ...res.data });
    })
    .catch(err => {
      alert('Error al actualizar datos');
      console.error(err);
    });
  };

  if (loading) return <div>Cargando perfil...</div>;
  if (error) return <div>{error}</div>;
  if (!userData) return <div>No hay datos de usuario.</div>;

  return (
    <>
      <header>
        <div className="container nav">
          <h1>Servic</h1>
          <nav>
            <ul>
              <li><Link to="/lobby">Inicio</Link></li>
              <li><button className="nav-btn" onClick={() => navigate('/lobby')}>Volver al lobby</button></li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="profile-layout">
        <aside className="profile-sidebar">
          <h3>Datos personales</h3>
          <ul>
            <li className={activeTab === 'datos-personales' ? 'active' : ''} onClick={() => setActiveTab('datos-personales')} style={{cursor: 'pointer'}}>Datos personales</li>
            <li className={activeTab === 'trabajador' ? 'active' : ''} onClick={() => setActiveTab('trabajador')} style={{cursor: 'pointer'}}>Datos de trabajador</li>
            <li>Seguridad</li>
          </ul>
        </aside>
        <div className="profile-container">
          {activeTab === 'trabajador' ? (
            <div className="worker-section">
              {isProviderVerified ? (
                <div className="verified-banner-green">Trabajador verificado</div>
              ) : (
                <>
                  <h2>Usted no es trabajador aún</h2>
                  <p>Conviértase en uno y acceda a nuevas oportunidades.</p>
                  <button className="profile-verify" onClick={() => navigate('/verify-provider-user')}>Verificar trabajador</button>
                </>
              )}
            </div>
          ) : (
            <>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <h2>Perfil de Usuario</h2>
                {isVerified && (
                  <div className="verified-banner-green">Usuario verificado</div>
                )}
              </div>
              <form className="profile-form" onSubmit={handleSubmit}>
            <div className="profile-fields">
              <div>
                <label>Usuario</label>
                <input name="username" value={formData.username} onChange={handleChange} placeholder="Usuario" />
              </div>
              <div>
                <label>Email</label>
                <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
              </div>
              <div>
                <label>Nombre</label>
                <input name="first_name" value={formData.first_name} onChange={handleChange} placeholder="Nombre" />
              </div>
              <div>
                <label>Apellido</label>
                <input name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Apellido" />
              </div>
              <div>
                <label>Teléfono</label>
                <input name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="Teléfono" />
              </div>
              <div>
                <label>Dirección</label>
                <input name="address" value={formData.address} onChange={handleChange} placeholder="Dirección" />
              </div>
              <div>
                <label>Código postal</label>
                <input name="zip_code" value={formData.zip_code} onChange={handleChange} placeholder="Código postal" />
              </div>
              <div>
                <label>Ciudad</label>
                <input name="city" value={formData.city} onChange={handleChange} placeholder="Ciudad" />
              </div>
              <div>
                <label>Provincia</label>
                <input name="state" value={formData.state} onChange={handleChange} placeholder="Provincia" />
              </div>
              <div>
                <label>País</label>
                <input name="country" value={formData.country} onChange={handleChange} placeholder="País" />
              </div>
              <div>
                <label>Nueva contraseña</label>
                <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Nueva contraseña" autoComplete="new-password" />
              </div>
              <div>
                <label>Confirmar contraseña</label>
                <input name="password2" type="password" value={formData.password2} onChange={handleChange} placeholder="Confirmar contraseña" autoComplete="new-password" />
              </div>
              <div>
                <label>Género</label>
                <select name="gender" value={formData.gender} onChange={handleChange} className="profile-select">
                  <option value="">Selecciona género</option>
                  <option value="male">Masculino</option>
                  <option value="female">Femenino</option>
                  <option value="other">Otro</option>
                  <option value="prefer_not_to_say">Prefiero no decirlo</option>
                </select>
              </div>
              <div>
                <label>Fecha de nacimiento</label>
                <input name="date_of_birth" type="date" value={formData.date_of_birth} onChange={handleChange} className="profile-date" />
              </div>
            </div>
                <button className="profile-save" type="submit">Actualizar Datos</button>
              </form>
              {!isVerified && (
                <button onClick={() => navigate('/verify-common-user')} className="profile-verify" style={{marginTop: '24px'}}>Verificar perfil</button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
