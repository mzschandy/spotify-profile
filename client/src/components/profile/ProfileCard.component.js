import React from "react"
import TabRow from "../tabrow/TabRow.component";
import Avatar from "./avatar/Avatar.component";

const ProfileCard = () => {
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