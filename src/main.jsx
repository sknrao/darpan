import ReactDOM from 'react-dom/client';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import App from './App';
import keycloak from './Keycloak';
import { WebsiteProvider } from './WebsiteContext';

const eventLogger = (event, error) => {
  console.log('Keycloak event:', event);
  if (error) {
    console.error('Keycloak error:', error);
  }
};

const tokenLogger = (tokens) => {
  console.log('Keycloak tokens:', tokens);
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ReactKeycloakProvider
    authClient={keycloak}
    onEvent={eventLogger}
    onTokens={tokenLogger}
    initOptions={{
      onLoad: 'check-sso', // Ensures session check on load
      pkceMethod: 'S256', // For enhanced security
    }}
  >
    <BrowserRouter> {/* Wrapping the app in BrowserRouter */}
      <WebsiteProvider>
        <App />
      </WebsiteProvider>
    </BrowserRouter>
  </ReactKeycloakProvider>
);
