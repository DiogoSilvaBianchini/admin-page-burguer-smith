import './style.css'
import { NavLink } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PersonIcon from '@mui/icons-material/Person';
import ChecklistIcon from '@mui/icons-material/Checklist';

const NavBar = () => {
  return (
    <div className='navBar-container'>
        <div className="perfil">
            <img src="/logo.webp" alt="logo hamburgueria burguer smith" />
            <div className="text-perfil">
                <h2>Burguer Smith</h2>
                <span>Hamburgueria</span>
            </div>
        </div>
        <nav>
            <ul>
                <li>
                    <NavLink to="/" className={({isActive}) => isActive ? "active":""}>
                        <HomeIcon />
                        Home
                    </NavLink>
                </li>
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
                <li>
                    <NavLink to="/equipes" className={({isActive}) => isActive ? "active":""}>
                        <PersonIcon />
                        Equipes
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/atividades" className={({isActive}) => isActive ? "active":""}>
                        <ChecklistIcon />
                        Atividades
                    </NavLink>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default NavBar