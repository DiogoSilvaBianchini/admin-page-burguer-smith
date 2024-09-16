import './style.css'
import ProductPage from './pages/ProductPage/ProductPage'
import NavBar from './components/navBar/NavBar'
import Home from './pages/Home/Home'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ProductFormPage from './pages/ProductFormPage/ProductFormPage'
import Login from './pages/login/Login'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="content">
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/produtos' element={<ProductPage />}/>
            <Route path='/produtos/criar' element={<ProductFormPage />}/>
            <Route path='/login' element={<Login />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
