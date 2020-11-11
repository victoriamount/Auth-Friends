import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Styled from 'styled-components'

const StyledFormSection = Styled.div`
    display: flex;
    justify-content: center;
    margin-top: 5vw;
`    

const StyledForm = Styled.form`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    height: 40vw;
    width: 40vw;
    background-color: lightgrey;
    color: white;
    input {
        width: 50%;
        margin-bottom: 2%;
        border-radius: 15px;
        padding: 1%;
        border: none;
    }
    button {
        width: 50%;
        border-radius: 15px;
        background-color: white;
        color: #05bdf9;
        border: none;
        padding: 1%;
        &:hover{
            background-color: #05bdf9;
            color: white;
        }
    }
`

const Login = (props) => {
    const [credentials, setCredentials] = useState({username: '', password: ''})
    const { setLoggedIn } = props

    const history = useHistory()

    const handleChange = e => {
        setCredentials({
            ...credentials, 
            [e.target.name]: e.target.value
        })
    }

    const login = e => {
        e.preventDefault()
        console.log(credentials)
        axios
            .post('http://localhost:5000/api/login', credentials)
            .then(res => {
                // console.log('response: ', res.data.payload)
                localStorage.setItem('token', res.data.payload)
                history.push('/protected')
                setLoggedIn(true)
            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <StyledFormSection>
            <StyledForm onSubmit={login}>
                <h2>Log In</h2>
                <input 
                    type='text'
                    name='username'
                    value={credentials.username}
                    onChange={handleChange}
                    placeholder='Username'
                />
                <input 
                    type='password'
                    name='password'
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder='Password'
                />
                <button>Submit</button>
            </StyledForm>
        </StyledFormSection>
    )
}

export default Login
