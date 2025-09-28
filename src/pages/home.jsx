import CourseList from "../components/course/CourseGrid"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

function Home() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // You can navigate to search results page or filter courses
      console.log("Searching for:", searchQuery)
      // navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const popularSearches = ["React", "Python", "JavaScript", "CSS", "Node.js"]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Master Skills With <span className="text-blue-600">Power Of AI</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Master coding skills with personalized, AI-generated courses, tutorials, and instant code help.
            Your journey to becoming a developer starts here.
          </p>

          {/* Search Bar Section */}
          <div className="max-w-2xl mx-auto mb-8">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search for courses, topics, or technologies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-full focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 pr-16 shadow-lg bg-white/80 backdrop-blur-sm"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors duration-200 shadow-md"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>

            {/* Popular Searches */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="text-sm text-gray-500 mr-2">Popular:</span>
              {popularSearches.map((term, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(term)}
                  className="text-sm bg-white/60 text-gray-700 px-3 py-1 rounded-full hover:bg-white hover:text-blue-600 transition-all duration-200 border border-gray-200 backdrop-blur-sm"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Start Learning Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
              const element = document.getElementById('courseList');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h6a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2v-8a2 2 0 012-2z" />
              </svg>
              Start Learning
            </button>
            <button
              onClick={() => {
                const element = document.getElementById('courseList');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="px-4 sm:px-6 lg:px-10 my-5" id="courseList">
        <CourseList />
      </section>
    </div>
  )
}

export default Home