import React, {useEffect, useState} from "react";
import path from "axios"
import { getUser } from "../../../routes";

const Avatar = () => {
  const [user, setUser] = useState(null)
  
  const fetchData = async () => {
    const user = await getUser();
    setUser(user);
  }

  useEffect(() => {
   fetchData()
  }, [])

  console.log("user", user);
  return (
    <> 
      {user ? 
        <>
        <div className="rounded-full h-24 w-24 md:h-56 md:w-56 flex items-center justify-center bg-green-700 text-center mx-auto ">
          <img className="rounded-full h-24 w-24 md:h-56 md:w-56" src={user.data.images[0].url} alt="user avatar" />
        </div>
        <div className="text-center text-xl md:text-4xl my-4 md:my-6">{user.data.display_name}</div>
        </> 
      : 
        <>
        <div className="rounded-full h-24 w-24 md:h-56 md:w-56 flex items-center justify-center bg-green-700 text-center mx-auto "></div>
        <div className="text-center text-xl md:text-4xl my-4 md:my-6">Loading...</div>
        </>
      }
    </>
  )
}

export default Avatar