import Swal from 'sweetalert2'
import { 
  getAuth, 
  signInWithPopup,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  debugErrorMap
} from "firebase/auth";

import { types } from "../types/types"
import { googleAuthProvider } from "../firebase/firebase-config";
import { finishLoading, startLoading } from "./ui";
import { notesLogOut } from './notes';

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch( startLoading() );

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email,password)
      .then((userCredential) => {
        console.log(userCredential)
        dispatch(login(userCredential.user.uid, userCredential.user.displayName));
      })
      .catch(({code}) => {
        const codeName = code.split('/')[1];
        const {value} = Object.getOwnPropertyDescriptor(debugErrorMap(), codeName);
        Swal.fire({
          icon: 'error',
          title: 'Oops...Error',
          text: value
        })
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
      .catch(({code}) => {
        const codeName = code.split('/')[1];
        const {value} = Object.getOwnPropertyDescriptor(debugErrorMap(), codeName);
        Swal.fire({
          icon: 'error',
          title: 'Oops...Error',
          text: value
        });
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
      .catch(({code}) => {
        const codeName = code.split('/')[1];
        const {value} = Object.getOwnPropertyDescriptor(debugErrorMap(), codeName);
        Swal.fire({
          icon: 'error',
          title: 'Oops...Error',
          text: value
        })
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

export const startLogout = () => {
  return async (dispatch) => {
    const auth = getAuth();
    await signOut(auth)

    dispatch( notesLogOut() )
    dispatch( logout() )
  }
}

export const logout = () => {
  return {
    type: types.logout
  }
}