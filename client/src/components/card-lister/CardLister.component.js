import React from "react";
import Card from "../card/Card.component";

const CardLister = () => {
  return(
    <>
    <div className="grid grid-cols-6 gap-6">
    <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
    </div>
      
    </>
  )
}

export default CardLister