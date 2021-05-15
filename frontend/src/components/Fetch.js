import {React, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';



  
let json;
  function Fetch({sub}) {

    const { user, isAuthenticated} = useAuth0();
    const [isFetched, setIsFetched] = useState(false)

    useEffect( () => {

        async function fetchUserInfo(){

          const subSplit = sub.split("|");

    
          const userPath = '/api/user/' + subSplit[1];
          console.log(userPath);

          try {
            const data = await fetch(userPath);

            if (data.status == 200){
              json = await data.json();
            }
                 
          } catch (err) {
            console.log("unable to grab data")
            
          }
          setIsFetched(true);
    
        }
    
        fetchUserInfo()
      } 
      )


      return (

        isAuthenticated && 
    
         isFetched && <div>
              {console.log(json)}
          </div>
          
      )
  }
  
  export default Fetch
  