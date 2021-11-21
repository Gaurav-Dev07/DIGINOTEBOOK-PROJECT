import React, { useState } from 'react'
import noteContext from '../context/notes/NoteContext';

const Login = () => {
    const [credentials, setCredentials] = useState({email : "", password : ""})


    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTQ1OGU4ZGYxYmE1Yjc4NTJlMzgxN2IiLCJpYXQiOjE2MzE5NTIwODF9.fAhmWcDRRSCvoa0gbpJ1AvmmUsfqQWago29g1j0BlEA'
              
            },
            body: JSON.stringify({email : credentials.email,password : credentials.password})
        });
        const json = await response.json();
        console.log(json);
        if(json.success) {
            // save the authtoken and redirect to home page
            localStorage.setItem('token')

        } else {
            alert("Invalid credentials");
        }
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name] : e.target.value})
    }
    return (
        <div>
            <form onSubmit = {handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" name ="email" className="form-control" id="email" value = {credentials.email} onChange = {onChange}  aria-describedby="emailHelp" placeholder="Enter email"/>
                    <small id="emailHelp"  className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" value = {credentials.password} onChange = {onChange}  name = "password" placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-primary my-2" >Submit</button>
             </form>
        </div>
    )
}

export default Login
