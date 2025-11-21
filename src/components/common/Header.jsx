import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { User } from 'lucide-react'
import { useAuth } from '../../context/authContext'
import Logo from '../../assets/logo.png'

function Header() {
  const [activeTab, setActiveTab] = useState('home')
  const { isAuthenticated, logout } = useAuth()
  const [openMenu, setOpenMenu] = useState(false)
  const dropdownRef = useRef()

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center h-16 justify-between">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center mr-auto">
            <Link to="/">
              <img src={Logo} alt="LearnLabs Logo" className="h-12 w-auto" />
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

          {/* Right Section */}
          <div className="flex items-center ml-6" ref={dropdownRef}>

            {!isAuthenticated ? (
              <Link to="/login">
                <button className="px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-semibold cursor-pointer transition">
                  Sign In
                </button>
              </Link>
            ) : (
              <>
                {/* Profile Icon */}
                <button
                  className="p-2 rounded-full hover:bg-gray-100 transition"
                  onClick={() => setOpenMenu(!openMenu)}
                >
                  <User className="h-6 w-6 text-gray-700 hover:text-blue-600" />
                </button>

                {/* Dropdown */}
                {openMenu && (
                  <div className="absolute right-6 top-16 w-44 bg-white shadow-lg border rounded-xl py-2 animate-fadeIn">
                    
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                    >
                      My Profile
                    </button>

                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                    >
                      Settings
                    </button>

                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                    >
                      Logout
                    </button>

                  </div>
                )}
              </>
            )}

          </div>

        </div>
      </div>
    </header>
  )
}

export default Header
