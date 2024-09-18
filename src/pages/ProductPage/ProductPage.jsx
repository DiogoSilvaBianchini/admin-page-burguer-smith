import './style.css'
import CardHorizontalProduct from '../../components/cardHorizontalProduct/CardHorizontalProduct'
import { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const ProductPage = () => {
  const [products, setProducts] = useState([])
  const [searchProducts, setSearchProducts] = useState([])
  const [search, setSearch] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      const req = await fetch(`${import.meta.env.VITE_BACK_END_URL}/product`)
      const res = await req.json()
      setProducts(res.results)
    }

    getProducts()
  },[])

  useEffect(() => {
    let list = products.filter((product) => product.title.toLowerCase().includes(search))
    setSearchProducts(list)
  },[search])

  return (
    <div className='product-page-container'>
      <h2>Seus produtos registrados</h2>
      <form className="search">
        <div className="search-button">
          <label htmlFor="search">
            <SearchIcon />
          </label>
          <input type="text" id='search' onChange={(e) => setSearch(e.target.value)} placeholder='Buscar por titulo de produto...'/>
        </div>
        <Link to="/produtos/criar" className='linkButton outLineButton'>+ Criar produto</Link>
      </form>
      <ul className="content">
        {
          products.length > 0 & searchProducts.length == 0 ? products.map(product => (
            <li key={product.id}>
              <CardHorizontalProduct id={product.id} title={product.title} price={product.price} imgUrl={product.imgs[0]}/>
            </li>
          )): searchProducts.map(product => (
            <li key={product.id}>
              <CardHorizontalProduct id={product.id} title={product.title} price={product.price} imgUrl={product.imgs[0]}/>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default ProductPage