import React from "react"
import CardLister from "../../card-lister/CardLister.component"
import ItemsList from "../../items-list/ItemsList.component"
//import Card from "../../card/Card.component"

const Tab = ({timePeriod, artists, songs}) => {
  console.log("tab component", artists)
  return (
    <>
      <div className="text-2xl mb-4">Top Artists {timePeriod}</div>
      <CardLister artists={artists}/>
      <div className="text-2xl my-4">Top Songs {timePeriod}</div>
      <ItemsList songs={songs}/>
    </>
  )
}

export default Tab