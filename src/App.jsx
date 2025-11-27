import './App.css'
import Header from './components/common/Header';
import Footer from './components/common/footer';
import Home from './pages/home';
import CourseContentPage from './pages/course';
import Signup from './pages/signup';
import Login from './pages/login' ;
import Roadmaps from './pages/roadmaps';
import RoadmapDetail from './pages/roadmapDetails';
import {Routes,Route} from 'react-router-dom'
import TopLoader from './components/common/loader';
function App() {  
  
  return (
    <>
      <Header/>
      <TopLoader/>
    	<Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/course/:slug" element={<CourseContentPage/>} />

        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/roadmaps" element={<Roadmaps/>} />
        <Route path="/roadmaps/:slug" element={<RoadmapDetail/>} />

      </Routes>
      <Footer/>


    </>
   );

  
}

export default App

export const live_url = import.meta.env.VITE_API_URL