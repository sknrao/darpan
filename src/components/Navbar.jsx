import React from 'react';
import { useWebsite } from '../WebsiteContext';
import { useKeycloak } from '@react-keycloak/web'; 
import Login from './Login';

const Navbar = () => {
  const { setActiveWebsite } = useWebsite();
  const { keycloak } = useKeycloak();

  if (!keycloak.authenticated) {
    return <Login />;
  }

  return (
    <nav className="navbar" style={{ padding: '10px', backgroundColor: '#333', color: '#fff' }}>
      {['home', 'website1', 'website2', 'website3', 'website4', 'website5', 'website6'].map((website) => (
        <button
          key={website}
          onClick={() => setActiveWebsite(website)}
          style={{ margin: '0 10px' }}
        >
          {website.charAt(0).toUpperCase() + website.slice(1)}
        </button>
      ))}
      <a href="/login">Login</a>
    </nav>
  );
};

export default Navbar;
