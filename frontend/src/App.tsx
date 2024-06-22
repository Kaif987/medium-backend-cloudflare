import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { Create } from './pages/Create'
import { useEffect } from 'react'
import { AuthContextProvider } from './context/authContext'

function App() {
  const navigate = useNavigate()
  let location = useLocation()

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/signin")
    }
  }, [])

  return (
    <AuthContextProvider>
      <div className=''>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </div>
    </AuthContextProvider>

  )
}

export default App