import React from "react"
import CardLister from "../../card-lister/CardLister.component"
import ItemsList from "../../items-list/ItemsList.component"
//import Card from "../../card/Card.component"

const Tab = () => {
  return (
    <>
      <div className="text-2xl mb-4">Top Artists This Month</div>
      <CardLister/>
      <div className="text-2xl my-4">Top Songs This Month</div>
      <ItemsList/>
      <div className="text-2xl my-4">Top ALbums This Month</div>
      <CardLister/>
    </>
  )
}

export default Tab