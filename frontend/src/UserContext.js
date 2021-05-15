import React , {useState, createContext} from 'react';

export const UserContext = createContext()


export const UserProvider = (props) =>{

    const [userContext, setUserContext] = useState({
        id: '',
        email: '',
        firstName: '',
        lastName: '',
        userLeagues: [],
        userTeams: []
    })


    return(
        <UserContext.Provider value={[userContext,setUserContext]}>
            {props.children}
        </UserContext.Provider>

    )
}


