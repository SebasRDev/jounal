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
            path="/jounal/auth/login"
            component={ LoginScreen }
          />
          <Route
            exact
            path="/jounal/auth/register"
            component={ RegisterScreen }
          />
          <Redirect 
            to="/jounal/auth/login"
          />
        </Switch>
      </div>
    </div>
  )
}
