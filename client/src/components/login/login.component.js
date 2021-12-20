import React from "react"

const LOGIN_URI = "http://localhost:5000/login"

const Login = () => {
  return (
    <>
      <h2>Spotify Login</h2>
      <a href={LOGIN_URI}>Login</a>
    </>
  )
}

export default Login;