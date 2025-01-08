import { useKeycloak } from '@react-keycloak/web';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
  const { keycloak } = useKeycloak();
  const navigate = useNavigate(); // Get the navigation function

  if (!keycloak.authenticated) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Login</h2>
        <button
          onClick={() => keycloak.login()}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            fontSize: '16px',
          }}
        >
          Log in with Keycloak
        </button>
      </div>
    );
  }

  // Redirect to the homepage or another page after successful login
  navigate('/'); // Ensure '/' matches your application's routing setup

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2>Redirecting...</h2>
    </div>
  );
};

export default Login;
