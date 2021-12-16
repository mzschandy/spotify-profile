import React from "react";
import ListItem from "../list-item/ListItem.component";

const ItemsList = ({songs}) => {
  return (
    <>
    <div className="">
      {songs ? (
        songs.items.slice(0,10).map((song, i) => (
          <ListItem 
            key={i}
            counter={i}
            name={song.name}
            album={song.album.name}
            artist={song.artists[0].name}
            length={song.duration_ms}
            image={song.album.images[2].url}
          />
        ))
      ) 
      : (
        <div>Loading...</div>
      )}
    </div>
      
    </>
  )
}

export default ItemsList