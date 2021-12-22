import React from "react"
import {FaSpotify} from "react-icons/fa"
import { IconContext } from "react-icons"

const LOGIN_URI =  'https://spotify-profile-card.herokuapp.com/login';

const Login = () => {
  return (
    <>
      <div className="w-screen h-screen flex">
        <div className="justify-center self-center mx-auto">
          <div className="text-4xl font-semibold mb-4">Spotify Profile</div>
          <a className="px-4 py-2 bg-green-700 rounded-full w-52 h-14 flex text-center justify-center items-center mx-auto" href={LOGIN_URI}>
            <IconContext.Provider value={{size: "2em"}}>
              <span>
                <FaSpotify />
              </span>
            </IconContext.Provider>
            <div className="ml-2">Login with Spotify</div>
          </a>
        </div>
      </div>
    </>
  )
}

export default Login;