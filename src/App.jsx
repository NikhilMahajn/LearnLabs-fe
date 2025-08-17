import './App.css'
import Header from './components/common/Header';
import Footer from './components/common/footer';
import Home from './pages/home';
import Course from './pages/course';

import {Routes,Route} from 'react-router-dom'

function App() {  
  
  return (
    <>
      <Header/>
    	<Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course" element={<Course/>} />
      </Routes>
      <Footer/>


    </>
   );

  
}

export default App
