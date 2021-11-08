import React from "react";

const ListItem = () => {
  return (
    <>
      <div className="gridcell grid rounded-sm px-4 gap-4 h-14">
              <div className="flex items-center">1</div>
              <div className="flex justify-start items-center">
                <div className="mr-4 bg-green-700 w-10 h-10"></div>
                <div>
                  <div>Song Name</div>
                  <div className="text-sm">Artist</div>
                </div>
                
              </div>
              <div className="flex items-center justify-self-start">Album Name</div>
              <div className="flex items-center justify-self-end">0:00</div>
            </div>
    </>
  )
}

export default ListItem