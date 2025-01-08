import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8080',
  realm: 'master',
  clientId: 'unified-web',
});

keycloak.onTokenExpired = () => {
  console.warn('Keycloak token has expired.');
  keycloak.updateToken(30).catch(() => {
    console.error('Failed to refresh token.');
    keycloak.logout();
  });
};

keycloak.onAuthSuccess = () => {
  console.log('Keycloak authentication successful.');
};

export default keycloak;
