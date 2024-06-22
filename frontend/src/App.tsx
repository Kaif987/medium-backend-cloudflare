import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { Create } from './pages/Create'
import { PrivateRoutes } from "./components/ui/PrivateRoutes"
import { NotLoggedIn } from "./components/ui/NotLoggedIn"
import { useEffect } from 'react'
import { BlogSkeleton } from './components/ui/BlogSkeleton'
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
          {/* <Route element={<NotLoggedIn />}> */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          {/* </Route> */}
          {/* <Route element={<PrivateRoutes />}> */}
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/create" element={<Create />} />
          {/* </Route> */}
          <Route path="/skeleton" element={<BlogSkeleton />} />
        </Routes>
      </div>
    </AuthContextProvider>
  )
}

export default App