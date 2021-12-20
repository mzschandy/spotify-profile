import React from "react"

const Card = ({artist, image}) => {
  return (
    <>
      <div className="p-4 spotify-gray rounded-md w-full relative">
        <div className="h-full">
          <div className="md:rounded-full relative md:mb-4">
            <div className="image-container w-full relative rounded-full">
              <div>
                <img className="rounded-full bg-green-800 absolute left-0 top-0 w-full h-full" src={image} alt="artist avatar"/>
              </div>
            </div>
          </div>
          <div className="card-bottom">
            <div className="max-w-full md:text-base text-sm">{artist}</div>
            <div className="text-xs mt-2">Artist</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card