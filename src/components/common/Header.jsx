import {Code} from 'lucide-react'
function Header(){
  
	return (
  <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Code className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">LearnLabs</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {/* {['home', 'courses', 'tutorials', 'code-help'].map((tab) => ( 
              // <button
              //   key={tab}
              //   onClick={() => setActiveTab(tab)}
              //   className={`px-3 py-2 text-sm font-medium capitalize transition-colors ${
              //     activeTab === tab
              //       ? 'text-blue-600 border-b-2 border-blue-600'
              //       : 'text-gray-700 hover:text-blue-600'
              //   }`}
              // >
                // {tab.replace('-', ' ')}
              // </button>
            // ))}
            */}
            </nav>

          {/* Search Bar 
          <div className="flex-1 max-w-lg mx-8 hidden md:block">
            <div className="relative">
             <SearchBar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search courses, tutorials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          */}
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className="text-gray-700 hover:text-blue-600"
            >
              {/* {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />} */}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {/* {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* {['home', 'courses', 'tutorials', 'code-help'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setIsMobileMenuOpen(false);
                }}
                className={`block px-3 py-2 text-base font-medium capitalize w-full text-left ${
                  activeTab === tab ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                }`}
              >
                {tab.replace('-', ' ')}
              </button>
            ))} 
          </div>
        </div>
      )} */}
    </header>
	)
}

export default Header
