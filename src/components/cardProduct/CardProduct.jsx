import './style.css'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const CardProduct = ({title, price, imgUrl}) => {
  return (
    <div className='card-container'>
        <div className="img-container">
            <img src={imgUrl ? imgUrl : "/logo.webp"} alt={title} />
        </div>
        <div className="content-card">
            <h2>{title ? title : "Nome do produto"}</h2>
            <span>R$ {price ? price : "0.00"}</span>
            <button className='darkButton'><InfoOutlinedIcon /> Informações do produto</button>
            <button><AddShoppingCartIcon /> Adicionar ao carrinho</button>
        </div>
    </div>
  )
}

export default CardProduct