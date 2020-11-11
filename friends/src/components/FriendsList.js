import React, { useState, useEffect } from 'react'
import Styled from 'styled-components'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { BrowserRouter as Router, Route, Link, Switch, useHistory } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import EditForm from './EditForm'

// const StyledFriend = Styled.div`
//     background-color: black;
//     color: white;
// `

const initialFriends = [
    {
        id: 1,
        name: 'Sterling',
        age: 6,
        email: 'sterl@me.com',
    },
    {
        id: 2,
        name: 'Shayne',
        age: 26,
        email: 'shayne@lambdaschool.com',
    }
]
const initialFormValues = {
    name: '',
    age: '',
    email: ''
}

const FriendsList = () => {

    const [formValues, setFormValues] = useState(initialFormValues)
    const [friends, setFriends] = useState([])
    const [clicked, setClicked] = useState('')





    const history = useHistory()

    useEffect(() => {
    axiosWithAuth()
        .get('/friends')
        .then(res => {
            console.log('fetching friends', friends)
            setFriends(res.data)
        })
        .catch(err => {å
            console.log(err)
        })
    }, [])


    const handleChange = e => {
        setFormValues({
            ...formValues, 
            [e.target.name]: e.target.value
        })
    }

    const submitNewFriend = e => {
        const newFriend = {
            ...formValues,
            id: friends.length+100
        }
        e.preventDefault()
        axiosWithAuth()
            .post('/friends', newFriend)
            .then(res => {
                console.log('response: ', res.data)
                setFriends(res.data)
                setFormValues(initialFormValues)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const deleteFriend = (id) => {
        // console.log(id)
        axiosWithAuth()
            .delete(`/friends/${id}`)
            .then(res => {
                // console.log('res: ',res.data)
                setFriends(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <div>
            {friends.map(friend => (
                <div key={friend.id} >
                    <p>{friend.name} {friend.age} {friend.email}</p>
                    <button onClick={() => deleteFriend(friend.id)}>Delete</button>
                </div>
            ))}

            <form onSubmit={submitNewFriend}>
                <h2>Add Friend</h2>              
                <input 
                    type='text'
                    name='name'
                    value={formValues.name}
                    onChange={handleChange}
                    placeholder='Name'
                />
                <input 
                    type='text'
                    name='age'
                    value={formValues.age}
                    onChange={handleChange}
                    placeholder='Age'
                />
                <input 
                    type='text'
                    name='email'
                    value={formValues.email}
                    onChange={handleChange}
                    placeholder='Email'
                />                
                <button>Submit</button>
            </form>         
        </div>
    )
}

export default FriendsList
