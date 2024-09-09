import './style.css'
import { Link, NavLink } from 'react-router-dom'


const Header = () => {
  return (
    <header>
      <nav>
        <img src="./logo.webp" alt="logo burguer smith" />
        <ul>
          <li>
            <NavLink to="/" className={({isActive}) => isActive ? "active":""}>
              Home
            </NavLink></li>
          <li>
            <NavLink to="/produtos" className={({isActive}) => isActive ? "active":""}>
              Produtos
            </NavLink></li>
          <li>
            <NavLink to="/pedidos" className={({isActive}) => isActive ? "active":""}>
              Pedidos
            </NavLink></li>
        </ul>
      </nav>
      <Link to="/">Faça login</Link>
    </header>
  )
}

export default Header