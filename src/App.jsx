import React from 'react';
import { useWebsite } from './WebsiteContext';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';

const MainRoutes = () => (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/login" element={<Login />} />
  </Routes>
)

export {MainRoutes}

const App = () => {
  const { activeWebsite } = useWebsite();

  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px' }}>
        {activeWebsite === 'home' && <h1>Welcome to the Home Page of Unified-web</h1>}
        {activeWebsite === 'website1' && (
          <iframe src="/website1/Amazon.html" title="Website 1" style={{ width: '100%', height: '80vh', border: 'none' }}></iframe>
        )}
        {activeWebsite === 'website2' && (
          <iframe src="/website2/camera.html" title="Website 2" style={{ width: '100%', height: '80vh', border: 'none' }}></iframe>
        )}
        {activeWebsite === 'website3' && (
          <iframe src="/website3/Spotify.html" title="Website 3" style={{ width: '100%', height: '80vh', border: 'none' }}></iframe>
        )}
        {activeWebsite === 'website4' && (
          <iframe src="http://localhost:3003/cabs" title="Website 4" style={{ width: '100%', height: '80vh', border: 'none' }}></iframe>
        )}
        {activeWebsite === 'website5' && (
          <iframe src="http://localhost:3000" title="Website 5" style={{ width: '100%', height: '80vh', border: 'none' }}></iframe>
        )}
        {activeWebsite === 'website6' && (
          <iframe src="http://localhost:3004" title="Website 6" style={{ width: '100%', height: '80vh', border: 'none' }}></iframe>
        )}
      </div>
    </div>
  );
};

export default App;