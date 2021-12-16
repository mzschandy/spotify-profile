import React from "react";
import Card from "../card/Card.component";

const CardLister = ({artists}) => {
  console.log("cardlister arists", artists)
  return(
    <>
    <div className="grid grid-cols-6 gap-6">
      {artists ? (
       artists.items.slice(0, 6).map((artist, i) => (
         <Card key={i} artist={artist.name} image={artist.images[0].url} />
       ))
      ): (
        <div>Loading...</div>
      )
      }
    </div>
      
    </>
  )
}

export default CardLister