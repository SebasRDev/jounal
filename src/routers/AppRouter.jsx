import React, { useEffect, useState } from 'react'
import { 
  BrowserRouter as Router, 
  Switch, 
  Route,
  Redirect
} from 'react-router-dom'
import { 
  getAuth, 
  onAuthStateChanged 
} from 'firebase/auth'
import { useDispatch } from 'react-redux'

import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRouter } from './AuthRouter'
import { login } from '../actions/auth'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

export const AppRouter = () => {
  const dispatch = useDispatch();
  
  const [checking, setChecking] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user)=>{

      if(user){
        dispatch( login(user.uid, user.displayName) );
        setIsLogged(true);
      }else{
        setIsLogged(false);
      }

      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLogged])
  
  if(checking){
    return(
      <h1>Loading...</h1>
    )
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute 
            logged={isLogged} 
            path="/auth"
            component={AuthRouter}
          />
          <PrivateRoute
            logged={isLogged} 
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
