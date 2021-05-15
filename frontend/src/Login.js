import './App.css';
import { Link } from 'react-router-dom';
import UserAuthProfile from './components/UserAuthProfile';
import AuthenticationButton from './components/AuthenticationButton';

function Login() {

  
  return (  
      <div className="login-block">
          
          <h2 className="login-header">Sign In</h2>
          <>
          <AuthenticationButton />
          </>  

      <br />
      <UserAuthProfile />

      </div>
  
  );
}

export default Login;