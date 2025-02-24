import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import Banner from './components/Banner'
import Text from './components/Text'
import LandingPage from './components/LandingPage'
import Page from './components/Page'
import Footer from './components/Footer'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />
      <Banner />
      <LandingPage />
      <Text />
      <Page />
      <Footer />
    </>
  )
}

export default App
