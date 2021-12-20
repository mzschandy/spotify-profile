import React from "react"
import TabRow from "../tabrow/TabRow.component";
import Avatar from "./avatar/Avatar.component";

const ProfileCard = () => {

  // console.log("testing", user.data.email);
  
  return (
    <>
      <div className="rounded-lg md:rounded-md spotify-dark-gray m-3 p-4 md:m-10 md:p-10">
        <Avatar />
        <TabRow/>
      </div>
    </>
  )
}

export default ProfileCard;