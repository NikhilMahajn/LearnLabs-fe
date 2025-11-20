import './App.css'
import Header from './components/common/Header';
import Footer from './components/common/footer';
import Home from './pages/home';
import CourseContentPage from './pages/course';
import Signup from './pages/signup';
import Login from './pages/login' ;

import {Routes,Route} from 'react-router-dom'

function App() {  
  
  return (
    <>
      <Header/>
    	<Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course/:id" element={<CourseContentPage/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
      <Footer/>


    </>
   );

  
}

export default App

export const live_url = import.meta.env.VITE_API_URL