import React from "react";

const ListItem = ({name, artist, album, length, image, counter}) => {

  const millisToMinutesAndSeconds = (length) => {
    const minutes = Math.floor(length / 60000);
    const seconds = ((length % 60000) / 1000).toFixed(0);
    return (
      seconds === 60 ?
      (minutes+1) + ":00" :
      minutes + ":" + (seconds < 10 ? "0" : "") + seconds
    )
  }
  
  const newLength = millisToMinutesAndSeconds(length);


  return (
    <>
      <div className="gridcell grid rounded-sm px-4 md:gap-4 h-14 spotify-gray">
              <div className="md:flex items-center hidden">{counter+=1}</div>
              <div className="flex justify-start items-center">
                <div className="mr-4 bg-green-700 w-10 h-10">
                  <img className="w-10 h-10" src={image} alt="album cover"/>
                </div>
                <div className="flex md:block flex-col overflow-ellipsis">
                  <div className="text-base overflow-hidden overflow-ellipsis w-52 whitespace-nowrap">{name}</div>
                  <div className="md:text-sm text-xs">{artist}</div>
                </div>
                
              </div>
              <div className="hidden md:flex items-center justify-self-start">{album}</div>
              <div className="hidden md:flex items-center justify-self-end">{newLength}</div>
            </div>
    </>
  )
}

export default ListItem