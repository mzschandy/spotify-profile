import React, { useEffect, useState } from "react"
import { getUser } from "../../routes";
import TabRow from "../tabrow/TabRow.component";
import Avatar from "./avatar/Avatar.component";

const ProfileCard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const {user} = await getUser();
      setUser(user);
    }
  }, [])

  console.log(user);
  
  return (
    <>
      <div className="rounded-md bg-gray-700 m-10 p-10">
        <Avatar/>
        <TabRow/>
      </div>
    </>
  )
}

export default ProfileCard;