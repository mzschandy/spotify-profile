import React from "react";
import Card from "../card/Card.component";
import Tab from "./tab/Tab.component";

const TabRow = () => {

  const openTab = (tabName) => {
    let i, content;
    content = document.getElementsByClassName("content")
    for (i = 0; i < content.length; i++) {
      content[i].style.display = "none"
    }

    document.getElementById(tabName).style.display = "block"

  }

  return(
    <>
      
      <div className="text-center">
        <button id="defaultOpen" onClick={() => openTab("ThisMonth")} className="mx-1 md:mx-5 hover:bg-gray-400 rounded-sm p-2">This Month</button>
        <button onClick={() => openTab("ThisYear")} className="mx-1 md:mx-5 hover:bg-gray-400 rounded-sm p-2">Year So Far</button>
        <button onClick={() => openTab("AllTime")} className="mx-1 md:mx-5 hover:bg-gray-400 rounded-sm p-2">All Time</button>
      </div>
      <div className="flex">
        <div id="ThisMonth" className="content default hidden w-full">
          <Tab/>
        </div>
        <div id="ThisYear" className="content hidden w-full">
          <Tab/>
        </div>
        <div id="AllTime" className="content hidden w-full">
          <Tab/>
        </div>
      </div>
    </>
  )
}

export default TabRow