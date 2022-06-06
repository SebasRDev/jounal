import React, { useEffect } from 'react'
import { 
  BrowserRouter as Router, 
  Switch, 
  Route,
  Redirect
} from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux'

import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRouter } from './AuthRouter'
import { login } from '../actions/auth'
import { setError } from '../actions/ui'

export const AppRouter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user)=>{

      if(user){
        dispatch( login(user.uid, user.displayName) );
      }

    });
  }, [])
  

  return (
    <Router>
      <div>
        <Switch>
          <Route 
            path="/auth"
            component={AuthRouter}
          />
          <Route
            exact
            path="/"
            component={JournalScreen}
          />
          <Redirect 
            to="/auth/login"
          />
        </Switch>
      </div>
    </Router>
  )
}
