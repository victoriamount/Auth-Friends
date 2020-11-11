import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Styled from 'styled-components'

import PrivateRoute from './components/PrivateRoute'

import Login from './components/Login'
import FriendsList from './components/FriendsList'

import './App.css';

const StyledHeader = Styled.header`
  display: flex;
  background-color: #05bdf9;
  color: white;
  justify-content: space-between;
  align-items: center;
  padding: 0 2%;
  nav {
    display: flex;
    justify-content: flex-end;
    width: 60%;
    align-items: center;
    h3{
      text-decoration: none;
      color: white;
      margin-left: 20px;
    }
  }
`

function App() {
  const [loggedIn, setLoggedIn] = useState(false)



  return (
    <Router>
      <div className='appBody'>
        <StyledHeader>
          <h1>FriendLister</h1>
          <nav>
            { (loggedIn) ? ( <Link to="/protected"><h3>Friends</h3></Link>) : (<div></div>) }
            {/* { (!loggedIn) ? (<Link to="/login"><h3>Log In</h3></Link>) : (<div></div>) }  */}
            <Link to="/login"><h3>Log In</h3></Link>
          </nav>
        </StyledHeader>
        <div>
          <Switch>
            <PrivateRoute path='/protected' component={FriendsList} />
            <Route path="/login" render={()=>{
              return <Login setLoggedIn={setLoggedIn} />
            }} />
            <Route component={Login} />        
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
