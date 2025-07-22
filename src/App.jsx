import { useState } from 'react'
import NavigationBar from './components/navigation-bar'
import Header from './components/header'
import ContentBody from './content-body'
import './App.css'

function App() {
  const navOptions = ["Dashboard", "Compare", "Manage Files"];
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <>
      <div className='app-container'>
        <div className="navigation-tab">
          <NavigationBar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          navOptions={navOptions}
          />
        </div>
        <div className='content-area'>
          <div className='content-header'>
            <Header currentPage={currentPage}/>
          </div>
          <div className='content-body'>
            <ContentBody currentPage={currentPage}/>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default App
