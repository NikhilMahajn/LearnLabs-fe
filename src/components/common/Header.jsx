import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Code, User } from 'lucide-react'
import Logo from '../../assets/logo.png'

function Header() {
  const [activeTab, setActiveTab] = useState('home')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center h-16 justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center mr-auto">
            <Link to="/">
              <img
                src={Logo}
                alt="LearnLabs Logo"
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {['home', 'courses', 'tutorials', 'code-help'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-2 text-sm font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {tab.replace('-', ' ')}
              </button>
            ))}
          </nav>

          {/* Profile Icon */}
          <div className="flex items-center ml-6">
            <Link to="/signup">
              <button
                className="p-2 rounded-full hover:bg-gray-100 transition"
                title="Profile"
              >
                <User className="h-6 w-6 text-gray-700 hover:text-blue-600" />
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden ml-3">
            <button className="text-gray-700 hover:text-blue-600">
              {/* You can toggle menu here later */}
              {/* {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />} */}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
