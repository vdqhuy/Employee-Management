import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/login/login';
import MainDashboard from './pages/main-dashboard/main-dashboard';
import ProtectPage from './pages/protected';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="*" element={<Navigate to="/login" replace/>}/>
        <Route path="/login" element={<LoginPage />} /> */}
        <Route path="*" element={<LoginPage />}/>
        <Route path="/login" element={<Navigate to="*" replace/>} />
        <Route path="/protected" element={<ProtectPage />} />
        <Route path="/main-dashboard/*" element={<MainDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
