import { useEffect, useState } from 'react'

import './App.css'
// import './styles/Page.css'

import Start from './components/Start'
import Info from './components/Info'
import Menu from './components/Menu'
import BookingForm from './components/BookingForm';
import Header from './components/Header'

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
    <Header/>
      <Menu setPage={setPage}/>
      {
        {
          "info": <Info />,
          "booking": <BookingForm/>,
        } [page] || <Start/>
      }
    </>
  )
}

export default App
