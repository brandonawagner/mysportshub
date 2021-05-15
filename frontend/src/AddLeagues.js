import './App.css';
import {Link} from 'react-router-dom';
import {UserContext} from './UserContext';
import React, {useContext, useState} from 'react';
import UserAuthProfile from './components/UserAuthProfile'
import { useAuth0 } from '@auth0/auth0-react';


function PickLeagues() {

  const [userContext, setUserContext] = useContext(UserContext);

  const { user } = useAuth0();

  const [userLeagues,setUserLeagues] = useState(user.userLeagues);


  const updateUserLeagues = (e) =>{
    /*e.preventDefault()*/

    setUserLeagues(

      (prev) => {

        if(e.target.checked){

          return[...prev,e.target.value]
  
        }else{
  
          let found = false;
          for(let i = 0; i < prev.length; i++){
  
            if(prev[i] === e.target.value && !found){
              prev.splice(i,1);
              found = true;
            }
          }
          return prev;      
        }
      }
    ) 
  }

  const setUserInfoClickHandler = (e) => {
    e.preventDefault();

    setUserContext(() => (
        { 
            id: user.sub.split('|')[1],
            email: user.email, 
            userLeagues: userLeagues,
            userTeams: user.userTeams
            
        })
    );
}

  return (
    

    <div>
      {/*TODO maybe have boolean for "first time sign up" or something to Welcome on this screen if
      i'm gong to use it for a user that comes back picking editing their leagues or maybe have edit leages as
  separate page*/}
      <h1>Hi {user.firstName}!</h1>
      <h2>Pick Your Leagues</h2>


      <div>
        <input onChange={updateUserLeagues} type="checkbox" value="NCAA" />Add NCAA
      </div>

      <div>
        <input onChange={updateUserLeagues} type="checkbox" value="NFL" />Add NFL
      </div>

      <div>
        <input onChange={updateUserLeagues} type="checkbox" value="NBA" />Add NBA
      </div>
      
      {console.log(userLeagues)}
      
      <button className="btn btn-dark" onClick={setUserInfoClickHandler}>
        <Link to="./PickTeams">Next</Link>
      </button>

      <UserAuthProfile />

      <div>
      <button className="btn btn-dark">
              <Link to="./Signup">
                  Go Back
              </Link>
      </button>
      </div>

     
    </div>
  );
}

export default PickLeagues;