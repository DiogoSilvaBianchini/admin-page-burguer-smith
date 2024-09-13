import './style.css'
import InputLabel from '../../components/inputLabel/InputLabel'
import InputFile from '../../components/inputFile/InputFile'
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';
import LunchDiningOutlinedIcon from '@mui/icons-material/LunchDiningOutlined';
import LiquorOutlinedIcon from '@mui/icons-material/LiquorOutlined';
import TapasOutlinedIcon from '@mui/icons-material/TapasOutlined';
import { useState } from 'react';

const ProductFormPage = () => {
  const [category, setCategory] = useState("")
  const [imgs, setImgs] = useState([])

  return (
    <div className='form-product'>
        <form onSubmit={(e) => e.preventDefault()}>
            <h2>Criar novo produto</h2>
            <InputLabel title="Nome"/>
            <InputLabel title="Preço"/>
            <InputLabel title="Descrição"/>
            <div className="categorySelect">
              <span>Categoria</span>
              <ul>
                <li>
                  <button onClick={() => setCategory("hamburguer")} className={category == "hamburguer" ? "box-category active":"box-category"}>
                    <LunchDiningOutlinedIcon />
                    <span>Hamburguer</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => setCategory("bebidas")} className={category == "bebidas" ? "box-category active":"box-category"}>
                    <LiquorOutlinedIcon />
                    <span>Bebida</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => setCategory("aperitivo")} className={category == "aperitivo" ? "box-category active":"box-category"}>
                    <TapasOutlinedIcon />
                    <span>Aperitivo</span>
                  </button>
                </li>
              </ul>
            </div>
            <InputFile title="Adicione uma imagem" value={imgs} change={setImgs}/>
            <button className='darkButton'><BookmarkAddedOutlinedIcon /> Registrar</button>
        </form>
    </div>
  )
}

export default ProductFormPage