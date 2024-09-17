import { Link, useNavigate } from "react-router-dom"
import EditIcon from '@mui/icons-material/Edit';
import "./style.css"

const CardHorizontalProduct = ({id, imgUrl, title, price}) => {

  return (
    <div className='card-horizontal-container' id={`product${id}`}>
        <div className="row">
          <img src={`${import.meta.env.VITE_URL_S3}/${imgUrl}`} alt="product" />
          <h2>{title}</h2>
        </div>
        <span>R$ {price}</span>
        <Link to={`/produtos/criar?id=${id}`} className="linkButton iconButton"><EditIcon /></Link>
    </div>
  )
}

export default CardHorizontalProduct