import React, { useEffect, useState } from 'react'
import { 
  BrowserRouter as Router, 
  Switch,
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
import { startLoadingNotes } from '../actions/notes'

export const AppRouter = () => {
  const dispatch = useDispatch();
  
  const [checking, setChecking] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async(user)=>{

      if(user){
        dispatch( login(user.uid, user.displayName) );
        setIsLogged(true);
        dispatch( startLoadingNotes(user.uid) )

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
            path="/journal/auth"
            component={AuthRouter}
          />
          <PrivateRoute
            logged={isLogged} 
            exact
            path="/journal"
            component={JournalScreen}
          />
          <Redirect 
            to="/journal/auth/login"
          />
        </Switch>
      </div>
    </Router>
  )
}
