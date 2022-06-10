import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { LoginScreen } from '../components/auth/LoginScreen'
import { RegisterScreen } from '../components/auth/RegisterScreen'

export const AuthRouter = () => {
  return (
    <div className='auth__main'>
      <div className='auth__box-container'>
        <Switch>
          <Route
            exact
            path="/journal/auth/login"
            component={ LoginScreen }
          />
          <Route
            exact
            path="/journal/auth/register"
            component={ RegisterScreen }
          />
          <Redirect 
            to="/journal/auth/login"
          />
        </Switch>
      </div>
    </div>
  )
}
