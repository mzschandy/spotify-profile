import React, { useEffect, useState } from "react";
import Card from "../card/Card.component";
import Tab from "./tab/Tab.component";
import { getTopArtistsLong,
  getTopArtistsMedium, 
  getTopTracksShort, 
  getTopTracksMedium, 
  getTopTracksLong,
  getAllArtists, 
  getTopArtistsShort} from "../../routes";
import axios from "axios";

const TabRow = () => {
  const [artistsMonth, setArtistsMonth] = useState(null)
  const [artistsYear, setArtistsYear] = useState(null)
  const [artistsAlltime, setArtistsAllTime] = useState(null)
  const [songsMonth, setSongsMonth] = useState(null)
  const [songsYear, setSongsYear] = useState(null)
  const [songsAlltime, setSongsAllTime] = useState(null)
  // const [albumsMonth, setAlbumsMonth] = useState(null)
  // const [albumsYear, setAlbumsYear] = useState(null)
  // const [albumsAlltime, setAlbumsAllTime] = useState(null)

  const fetchData = async () => {
    /*
    const {artistsMonth, artistsYear, artistAlltime} 
      = await getAllArtists()*/
    const artistsMonth = await getTopArtistsShort();
    const artistsYear = await getTopArtistsMedium();
    const artistsAllTime = await getTopArtistsLong();
    const songsMonth = await getTopTracksShort();
    const songsYear = await getTopTracksMedium();
    const songsAllTime = await getTopTracksLong();

    setArtistsMonth(artistsMonth)
    setArtistsYear(artistsYear)
    setArtistsAllTime(artistsAllTime)
    setSongsMonth(songsMonth)
    setSongsYear(songsYear)
    setSongsAllTime(songsAllTime)
    //setArtistsAllTime(artistAlltime);
    //setArtistsMonth(artistsMonth);
    //setArtistsYear(artistsYear);

  }


  useEffect(() => {
    fetchData()
  }, [])

  const openTab = (tabName) => {
    let i, content;
    content = document.getElementsByClassName("content")
    for (i = 0; i < content.length; i++) {
      content[i].style.display = "none"
    }

    document.getElementById(tabName).style.display = "block"

  }

  console.log("artistsMonth", artistsMonth)
  console.log("artistsYear", artistsYear)
  console.log("artistsAllTime", artistsAlltime)
  console.log("songsMonth", songsMonth)

  return(
    <>
      
      <div className="text-center">
        <button id="defaultOpen" onClick={() => openTab("ThisMonth")} className="mx-1 md:mx-5 hover:bg-gray-400 rounded-sm p-2">This Month</button>
        <button onClick={() => openTab("ThisYear")} className="mx-1 md:mx-5 hover:bg-gray-400 rounded-sm p-2">Year So Far</button>
        <button onClick={() => openTab("AllTime")} className="mx-1 md:mx-5 hover:bg-gray-400 rounded-sm p-2">All Time</button>
      </div>
      <div className="flex">
        <div id="ThisMonth" className="content default hidden w-full">
          {artistsMonth && songsMonth ? <Tab 
                            timePeriod="This Month" 
                            artists={artistsMonth.data}
                            songs={songsMonth.data} /> : <div>Loading...</div> }
        </div>
        <div id="ThisYear" className="content hidden w-full">
          {artistsYear && songsYear ? <Tab 
                            timePeriod="This Year" 
                            artists={artistsYear.data}
                            songs={songsYear.data} /> : <div>Loading...</div>}
        </div>
        <div id="AllTime" className="content hidden w-full">
          {artistsAlltime && songsAlltime ? <Tab 
                              timePeriod="of All Time" 
                              artists={artistsAlltime.data}
                              songs={songsAlltime.data} /> : <div>Loading...</div>}
        </div>
      </div>
    </>
  )
}

export default TabRow