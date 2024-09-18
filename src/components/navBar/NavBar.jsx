import './style.css'
import { NavLink, useNavigate } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext } from 'react';
import UserContext from '../../context/userContext';
import Cookies from 'js-cookie'

const NavBar = () => {
    const {user} = useContext(UserContext)
    const navigate = useNavigate()
    
    const logOut = (e) => {
        Cookies.remove("token")
        navigate("/login")
    }
  return (
    <div className='navBar-container'>
        <div className="perfil">
            <img src="/logo.webp" alt="logo hamburgueria burguer smith" />
            <div className="text-perfil">
                {user.name ?
                    <>
                        <h2>{user.name.toUpperCase()}</h2>
                        <span>Bem-vindo(a)</span>
                    </>:
                    <h2>Bem-vindo(a)</h2>
                }
            </div>
        </div>
        <nav>
            <ul>
                <li>
                    <NavLink to="/produtos" className={({isActive}) => isActive ? "active":""}>
                        <ShoppingCartIcon />
                        Produtos
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/pedidos" className={({isActive}) => isActive ? "active":""}>
                        <FormatListBulletedIcon />
                        Pedidos
                    </NavLink>
                </li>
                <li onClick={logOut}>
                    <LogoutIcon />
                    Sair
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default NavBar