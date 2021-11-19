import React from "react"

const Card = () => {
  return (
    <>
      <div className="p-4 bg-gray-900 rounded-md w-full">
        <div className="h-full">
          <div className="rounded-full mb-4 w-full bg-green-800" style={{"paddingBottom":"100%"}}></div>
          <div style={{"minHeight": 62}}>
            <div className="max-w-full">Artist Name</div>
            <div className="text-xs mt-2">Artist</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card