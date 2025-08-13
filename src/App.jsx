import { useState,useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [name, setName] = useState()
  useEffect(() => {
    const getData = async () =>{
      const response = await fetch("https://learnlabs-be.onrender.com/")
      const data = await response.json()
      setName(data.message)
    }
    getData()
  });
  
  return (
    <>
     <h> This is my name : {name}</h>
    </>
  )
}

export default App
