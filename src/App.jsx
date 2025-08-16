import { useState,useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/home';
import Header from './components/common/Header';
function App() {
  const [name, setName] = useState()
  useEffect(() => {
    // const getData = async () =>{
    //   const response = await fetch("https://learnlabs-be.onrender.com/")
    //   const data = await response.json()
    //   setName(data.message)
    // }
    // getData()
  });
  
  
  return (
    <>
    	<Header/>
      <Home/>

    </>
   );

  
}

export default App
