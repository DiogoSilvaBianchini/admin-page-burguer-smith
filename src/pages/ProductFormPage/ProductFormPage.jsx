import './style.css'
import InputLabel from '../../components/inputLabel/InputLabel'
import InputFile from '../../components/inputFile/InputFile'
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';
import LunchDiningOutlinedIcon from '@mui/icons-material/LunchDiningOutlined';
import LiquorOutlinedIcon from '@mui/icons-material/LiquorOutlined';
import TapasOutlinedIcon from '@mui/icons-material/TapasOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEffect, useState } from 'react';
import CardProduct from '../../components/cardProduct/CardProduct';
import { useSearchParams } from 'react-router-dom';

const ProductFormPage = () => {
  const [category, setCategory] = useState("")
  const [allCategorys, setAllCategorys] = useState([])
  const [title, setTitle] = useState("")
  const [titleError, setTitleError] = useState("")
  const [price, setPrice] = useState("")
  const [priceError, setPriceError] = useState("")
  const [describe, setDescribe] = useState("")
  const [describeError, setDescribeError] = useState("")
  const [imgs, setImgs] = useState([])
  const [imgsError, setImgsError] = useState("")
  const [previewImgs, setPreviewImgs] = useState([])
  const [coverImg, setCoverImg] = useState()

  const [searchParams] = useSearchParams()
  const id = searchParams.get("id")

  useEffect(() => {
    const getProduct = async () => {
      const req = await fetch(`${import.meta.env.VITE_BACK_END_URL}/product/filter?id=${id}`)
      const res = await req.json()
      const product = res.results[0]

      setTitle(product.title)
      setPrice(product.price)
      setDescribe(product.describe)
      setCategory(product.categoryId)

      let imgs = []
      product.imgs.map(img => {
        imgs.push(`${import.meta.env.VITE_URL_S3}/${img}`)
      })
      setPreviewImgs(imgs)
      setCoverImg(`${import.meta.env.VITE_URL_S3}/${product.imgs[0]}`)
    }

    id && getProduct()
  },[searchParams])

  useEffect(() => {
    if(!coverImg && previewImgs){
      setCoverImg(previewImgs[0])
    }
  }, [previewImgs])

  const handdleSubmit = async (e) => {
    e.preventDefault()
    const validated = validationForm()
    const body = bodyBuilding()
    const url = id ? `http://localhost:8082/product/${id}`:"http://localhost:8082/product"
    const method = id ? "PUT" : "POST"
    
    if(validated){
      const httpRequest = await fetch(url, {
        method: method,
        body
      })
      const httpResponse = await httpRequest.json()
      console.log(httpResponse)
    }
  }

  const bodyBuilding = () => {
    const body = new FormData()
    body.append("title", title)
    body.append("price", price)
    body.append("describe", describe)
    body.append("categoryId", category)
    if(imgs){
      imgs.map((img) => {
        body.append("imgs", img)
      })
    }
    return body
  }

  const validationForm = () => {
    let validated = true
    if(!title){
      setTitleError("O produto precisa de um título.")
      validated = false
    }else{
      setTitleError("")
    }
    if(!price){
      setPriceError("O produto precisa de um preço.")
      validated = false
    }else{
      setPriceError("")
    }
    if(!describe){
      setDescribeError("O produto precisa de uma descrição.")
      validated = false
    }else{
      setDescribeError("")
    }
    if(coverImg.length <= 0){
      setImgsError("Adicione ao menos 1 foto para o produto.")
      validated = false
    }else{
      setImgsError("")
    }
    return validated
  }

  return (
    <div className='form-product'>
        <form onSubmit={handdleSubmit}>
            <h2>{id ? "Editar produto":"Criar novo produto"}</h2>
            <InputLabel title="Nome" change={setTitle} value={title} errorText={titleError}/>
            <InputLabel title="Preço" change={setPrice} value={price} errorText={priceError}/>
            <InputLabel title="Descrição" change={setDescribe} value={describe} errorText={describeError}/>
            <div className="categorySelect">
              <span>Categoria</span>
              <ul>
                <li>
                  <button type='button' onClick={() => setCategory(2)} className={category == 2 ? "box-category active":"box-category"}>
                    <LunchDiningOutlinedIcon />
                    <span>Hamburguer</span>
                  </button>
                </li>
                <li>
                  <button type='button' onClick={() => setCategory(3)} className={category == 3 ? "box-category active":"box-category"}>
                    <LiquorOutlinedIcon />
                    <span>Bebida</span>
                  </button>
                </li>
                <li>
                  <button type='button' onClick={() => setCategory(1)} className={category == 1 ? "box-category active":"box-category"}>
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
              errorText={imgsError}
              />
            <button className='darkButton'><BookmarkAddedOutlinedIcon /> Salvar</button>
            {id && <button className='deleteButton'><DeleteForeverIcon /> Remover</button>}
        </form>
        <CardProduct title={title} price={price} imgUrl={coverImg}/>
    </div>
  )
}

export default ProductFormPage