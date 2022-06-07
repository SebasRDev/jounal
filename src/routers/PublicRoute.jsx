import React from 'react'

import { Route, Redirect } from 'react-router-dom'

export const PublicRoute = ({
  logged,
  component: Component,
  ...rest
}) => {
  return (
    <Route {...rest}
      component={(props) => (
        (!logged) 
          ? <Component {...props} />
          : <Redirect to='/' />
      )}
    />
  )
}