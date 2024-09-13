import './style.css'
import InputLabel from '../../components/inputLabel/InputLabel'
import InputFile from '../../components/inputFile/InputFile'
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';
import LunchDiningOutlinedIcon from '@mui/icons-material/LunchDiningOutlined';
import LiquorOutlinedIcon from '@mui/icons-material/LiquorOutlined';
import TapasOutlinedIcon from '@mui/icons-material/TapasOutlined';
import { useEffect, useState } from 'react';
import CardProduct from '../../components/cardProduct/CardProduct';

const ProductFormPage = () => {
  const [category, setCategory] = useState("")
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [describe, setDescribe] = useState("")
  const [imgs, setImgs] = useState([])
  const [previewImgs, setPreviewImgs] = useState([])
  const [coverImg, setCoverImg] = useState()

  useEffect(() => {
    if(!coverImg && previewImgs){
      setCoverImg(previewImgs[0])
    }
    console.log(previewImgs[0])
  }, [previewImgs])

  return (
    <div className='form-product'>
        <form onSubmit={(e) => e.preventDefault()}>
            <h2>Criar novo produto</h2>
            <InputLabel title="Nome" change={setTitle} value={title}/>
            <InputLabel title="Preço" change={setPrice} value={price}/>
            <InputLabel title="Descrição" change={setDescribe} value={describe}/>
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
            <InputFile 
              title="Adicione uma imagem" 
              value={imgs} 
              change={setImgs} 
              setPreviewImgs={setPreviewImgs} 
              previewImgs={previewImgs}
              setCoverImg={setCoverImg}
              />
            <button className='darkButton'><BookmarkAddedOutlinedIcon /> Registrar</button>
        </form>
        <CardProduct title={title} price={price} imgUrl={coverImg}/>
    </div>
  )
}

export default ProductFormPage