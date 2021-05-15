import './App.css';
import React, { useState, useContext } from 'react'
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { UserContext } from './UserContext'


export default function Signup() {

    const [user, setUser] = useContext(UserContext);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);

    const updateEmail = (e) => {
        setEmail(e.target.value);
    }

    const updateFirstName = (e) => {
        setFirstName(e.target.value);
    }

    const updateLastName = (e) => {
        setLastName(e.target.value);
    }

    const updatePassword = (e) => {
        setPassword(e.target.value);
    }

    const setUserInfoClickHandler = (e) => {
        e.preventDefault();

        setUser(() => (
            { 
                email: email, 
                firstName: firstName,
                lastName: lastName,
                password: password,
                userLeagues: user.userLeagues,
                userTeams: user.userTeams
                
            })
        );
    }

    return (
        <div >
            <h2>Signup</h2>

            <form className="signup-form-items">

                <div>
                    <label htmlFor="email">Enter email</label>
                    <input id="email" type="email" value={email} onChange={updateEmail} placeholder="Email address..."></input>
                </div>

                <div>
                    <label htmlFor="firstName">Enter first name</label>
                    <input id="firstName" type="text" value={firstName} onChange={updateFirstName} placeholder="First name..."></input>
                </div>

                <div>
                    <label htmlFor="lastName">Enter last name</label>
                    <input id="lastName" type="text" value={lastName} onChange={updateLastName} placeholder="Last name..."></input>
                </div>


                <div>
                    <label htmlFor="password">Enter password</label>
                    <input id="password" type="password" value={password} onChange={updatePassword} placeholder="Password..."></input>
                </div>


                <button onClick={setUserInfoClickHandler} className="btn btn-dark">
                    <Link to="./PickLeagues">
                        Next
                    </Link>
                </button>
            </form>

            <br />

            <button className="btn btn-dark">
                <Link to="./Login">
                    Go Back
                </Link>
            </button>

        </div>
    )
}

