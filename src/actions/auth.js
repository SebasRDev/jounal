import { types } from "../types/types"
import { 
  getAuth, 
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  updateProfile 
} from "firebase/auth";
import { googleAuthProvider } from "../firebase/firebase-config";
import { finishLoading, startLoading } from "./ui";

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch( startLoading() );
    
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email,password)
      .then(({user}) => {
        dispatch(login(user.uid, user.displayName));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error({errorCode,errorMessage})
      })
      .finally(()=>{
        dispatch(finishLoading());
      })
  }
}

export const startRegisterWithEmailPassword = (email, password, name) => {
  return (dispatch) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential)=>{
        const {user} = userCredential
        await updateProfile(auth.currentUser,{
          displayName: name
        })
        dispatch(login(user.uid, user.displayName));
      })
      .catch(e => {
        console.error(e)
      })
  }
}

export const startGoogleLogin = () => {
  return(dispatch) => {
    const auth = getAuth();
    signInWithPopup(auth, googleAuthProvider)
      .then(({user}) => {
        dispatch(login(user.uid, user.displayName));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log({errorCode, errorMessage, email, credential})
      });
  }
}

export const login = (uid, displayName) => {
  return{
    type: types.login,
    payload: {
      uid,
      displayName
    }
  }
}