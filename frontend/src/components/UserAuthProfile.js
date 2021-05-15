import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import Fetch from './Fetch';

function UserAuthProfile() {

    const { user, isAuthenticated} = useAuth0();

    return (
        isAuthenticated && ( 
        <div>
            
            Welcome {user.given_name}

            <Fetch sub={user.sub} />
        </div>
        )
    )
}

export default UserAuthProfile
