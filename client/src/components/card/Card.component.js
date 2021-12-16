import React from "react"

const Card = ({artist, image}) => {
  return (
    <>
      <div className="p-4 bg-gray-900 rounded-md w-full">
        <div className="h-full">
          <div className="">
            <img className="rounded-full mb-4 h-full  w-full bg-green-800" src={image} alt="artist avatar"/>
          </div>
          <div style={{"minHeight": 62}}>
            <div className="max-w-full">{artist}</div>
            <div className="text-xs mt-2">Artist</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card