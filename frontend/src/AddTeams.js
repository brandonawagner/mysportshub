import './App.css';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import React, { useContext, useState, useEffect, useRef } from 'react'


function AddTeams() {

  const Static_NCAA = "NCAA"
  const Static_NFL = "NFL"
  const Static_NBA = "NBA"

  const [user, setUser] = useContext(UserContext);

  const [userTeams, setUserTeams] = useState(user.userTeams)

  const [NCAADropdown, setNCAADropdown] = useState([])

  const [isNCAASelected, setIsNCAASelected] = useState(false)
  const [isNFLSelected, setIsNFLSelected] = useState(false)
  const [isNBASelected, setIsNBASelected] = useState(false)

  const leagueList = user.userLeagues.map(
    (league) => <li key={user.userLeagues.indexOf(league)}>{league}</li>
  )

  useEffect(() => {

    async function fetchTeams() {

      /*fetch college teams*/
      const apiLocation = '/api/teams'
      const data = await fetch(apiLocation)
  
      const teams = await data.json()
  
      const ncaaCheckbox = teams.map(
        (team) => <div key={team.id}>
          <label>
            <input onChange={setNCAATeamsChangeHandler} 
                  style={{ display: "in-line" }} type="checkbox" 
                  key={team.id} 
                  name={team.location + ' ' + team.mascot} 
                  value={team.location + "/" + team.mascot} />
            {" " + team.location + ' ' + team.mascot}
          </label>
        </div>
      )
  
      setNCAADropdown(ncaaCheckbox)
    }
    fetchTeams();



    const setSelectedValues = () =>{

      for(let i = 0; i < user.userLeagues.length;i++){
  
        if(user.userLeagues[i] === Static_NCAA){
          setIsNCAASelected(true);
  
        }else if(user.userLeagues[i] === Static_NFL){
          setIsNFLSelected(true);
  
        }else if(user.userLeagues[i] === Static_NBA){
          setIsNBASelected(true);
  
        }else{
          throw "Invalid league " & user.userLeagues[i];
        }
  
      }
    }
    setSelectedValues();
  },[user])

  const setNCAATeamsChangeHandler = (e) => {
    /*do not prevent default, we want the click*/
    setUserTeams( (prev) => {

      if(e.target.checked){

        let teamArr = e.target.value.split("/")

        return[...prev,{
          league: Static_NCAA,
          team: teamArr[0],
          mascot:teamArr[1]
        }]

      }else{

        let found = false;
        for(let i = 0; i < prev.length; i++){

          if(prev[i].league === Static_NCAA && prev[i].team === e.target.value && !found){
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

    setUser(() => (
        { 
            email: user.email, 
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.password,
            userLeagues: user.userLeagues,
            userTeams: userTeams
            
        })
    );
}


  return (

    <div>
      <h2>Add Your Teams</h2>
      <ul>
        {leagueList}
      </ul>

      <h3>College Teams</h3>

      <form name="teamsPickForm">
        <fieldset className = "scroll" name="collegeTeamsPick" form="teamsPickForm">
          {NCAADropdown}
        </fieldset>
      </form>

      <button className="btn btn-dark" onClick={setUserInfoClickHandler}>
        <Link to="./Home">
          Next</Link>
      </button>
    </div>
  );
}

export default AddTeams;