import './style.css'
import ProductPage from './pages/ProductPage/ProductPage'
import NavBar from './components/navBar/NavBar'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ProductFormPage from './pages/ProductFormPage/ProductFormPage'
import Login from './pages/login/Login'
import Register from './pages/Register/Register'
import UserContext from './context/userContext'
import { useState } from 'react'
import AutoGuard from './utils/AutoGuard'
import SimpleFormUser from './pages/SimpleFormUser/SimpleFormUser'


function App() {
  const [user, setUser] = useState("")

  return (
    <div className="App">
      <UserContext.Provider value={{user, setUser}}>
        <BrowserRouter>
          <NavBar />
          <div className="content">
            <Routes>
              <Route path='/login' element={<Login />}/>
              <Route path='/register' element={<Register />}/>
              <Route path='/simpleRegister' element={<SimpleFormUser />}/>
              <Route element={<AutoGuard />}>
                <Route path='/produtos' element={<ProductPage />}/>
                <Route path='/produtos/criar' element={<ProductFormPage />}/>
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  )
}

export default App
