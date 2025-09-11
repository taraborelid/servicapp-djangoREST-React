import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Lobby from './pages/Lobby';
import Profile from './pages/Profile'; 
import VerifyCommonUser from './pages/VerifyCommonUser';
import VerifyProviderUser from './pages/VerifyProviderUser';
import './styles/styles.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path ="/profile" element={<Profile />} />
        <Route path="/verify-common-user" element={<VerifyCommonUser />} />
        <Route path="/verify-provider-user" element={<VerifyProviderUser />} />

        {/* Puedes agregar más rutas aquí si haces más páginas */}
      </Routes>
    </Router>
  )
}

export default App;
