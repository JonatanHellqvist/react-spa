import { useEffect, useState } from 'react'

import './App.css'

import Start from './components/Start'
import Personal from './components/Personal'
import Info from './components/Info'
import Booking from './components/Booking'
import Menu from './components/Menu'

function App() {
  
  //vilken sida som visas
  const [page, setPage] = useState<string>("");

  //för att urlen ska ändras
  useEffect (() => {

    let pageUrl = page;

    if (!pageUrl) {
        const queryParameters = new URLSearchParams(window.location.search);
        const getUrl = queryParameters.get("page");

    if (getUrl) {
      pageUrl = getUrl;
      setPage(getUrl)
    } else {
      pageUrl = "start"
    }
    } 

    window.history.pushState(
      null,
      "",
      "?page=" + pageUrl
    )
  }, [page])

  return (
    <>
      <h1>Spa</h1>
      <Menu setPage={setPage}/>
      {
        {
          "info": <Info />,
          "personel": <Personal/>,
          "booking": <Booking/>
        } [page] || <Start/>
      }
    </>
  )
}

export default App
