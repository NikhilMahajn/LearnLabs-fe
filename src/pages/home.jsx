import CourseList from "../components/course/CourseGrid"
function Home(){

	return (
	<div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Learn Programming with <span className="text-blue-600">AI-Powered</span> Content
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Master coding skills with personalized, AI-generated courses, tutorials, and instant code help. 
            Your journey to becoming a developer starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              Start Learning
            </button>

          </div>

        </div>
        
      </section>
        <CourseList/>
      <section>


      </section>
	</div>
	)
}
export default Home