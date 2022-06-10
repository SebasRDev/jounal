import React from 'react'
import { Link } from 'react-router-dom'
import validator from "validator";
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../hooks/useForm'
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPassword } from '../../actions/auth';

export const RegisterScreen = () => {

  const dispatch = useDispatch();
  const { msgError } = useSelector( state => state.ui)
  

  const [values, handleInputChange] = useForm({
    name: '',
    email:'',
    password:'',
    password2:''
  });

  const {name, email, password, password2} = values;

  const handleRegister = (e) => {
    e.preventDefault();
    if(isFormValid()){
      console.log('correct form')
      dispatch( startRegisterWithEmailPassword(email,password,name) );
    }
  }

  const isFormValid = () => {
    for(const [field, fieldData] of Object.entries(values)){
      if(fieldData.trim().length === 0){
        dispatch( setError('fields cannot be empty') )
        return false
      }
      
      if(field === 'email' && !validator.isEmail(fieldData)){
        dispatch( setError('Email is not valid!') )
        return false
      }

      if(password !== password2 || password.length <= 5){
        dispatch( setError('Password should be at least 6 characters and match each other') );
        return false
      }
    }

    dispatch( removeError() )
    return true
  }

  return (
    <>
    <h3 className='auth__title'>Register</h3>
    <form
      className='animate__animated animate__fadeIn animate__faster'
      onSubmit={handleRegister}
    >
      {msgError && 
        (<div className='auth__alert-error'>
          {msgError}
        </div>)
      }
      <input 
        type="text"
        placeholder='Name'
        name='name'
        autoComplete='off'
        className='auth__input'
        value={name}
        onChange={handleInputChange}
      />
      <input 
        type="text"
        placeholder='Email'
        name='email'
        autoComplete='off'
        className='auth__input'
        value={email}
        onChange={handleInputChange}
      />
      <input 
        type="password"
        placeholder='Password'
        name='password'
        className='auth__input'
        value={password}
        onChange={handleInputChange}
      />
      <input 
        type="password"
        placeholder='Confirm password'
        name='password2'
        className='auth__input'
        value={password2}
        onChange={handleInputChange}
      />
      <button
        className='btn btn--primary btn--block'
        type='submit'
      >
        Register
      </button>

      <hr className='mt-5'/>
      <div className='auth__social-networks'>
        <p>Login with social networks</p>
        <div 
          className="google-btn"
        >
          <div className="google-icon-wrapper">
              <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
          </div>
          <p className="btn-text">
              <b>Sign in with google</b>
          </p>
        </div>
      </div>

      <Link 
        to="/journal/auth/login"
        className='link'
      >
        I already have an account
      </Link>
    </form>
  </>
  )
}
