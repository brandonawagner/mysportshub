import './App.css';
import Login from './Login';
import Home from './Home';
import Signup from './Signup';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddLeagues from './AddLeagues';
import AddTeams from './AddTeams';
import { UserProvider } from './UserContext'
import Auth0ProviderWithHistory from "./auth/Auth0ProviderWithHistory";
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from './auth/ProtectedRoute';

import 'bootstrap/dist/css/bootstrap.min.css';
import Fetch from './components/Fetch'


function App() {


  

  

  return (

      <UserProvider>
        <h1 style={{textAlign:"center"}}>MySportsHub</h1>
        <Router>
          <Auth0ProviderWithHistory>
            <div className="App">
              <div className="App-container">            
                  <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/Fetch" component={Fetch} />
                    <ProtectedRoute path="/Signup" component={Signup} />
                    <ProtectedRoute path="/AddLeagues" exact component={AddLeagues} />
                    <ProtectedRoute path="/AddTeams" exact component={AddTeams} />
                  </Switch>
              </div>
            </div>
            </Auth0ProviderWithHistory>
        </Router>
      </UserProvider>
  );
}

export default App;
