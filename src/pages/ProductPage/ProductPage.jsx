import './style.css'
import CardHorizontalProduct from '../../components/cardHorizontalProduct/CardHorizontalProduct'
import { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const ProductPage = () => {
  const [products, setProducts] = useState([])
  
  useEffect(() => {
    const getProducts = async () => {
      const req = await fetch(`${import.meta.env.VITE_BACK_END_URL}/product`)
      const res = await req.json()
      setProducts(res.results)
    }

    getProducts()
  },[])

  return (
    <div className='product-page-container'>
      <h2>Seus produtos registrados</h2>
      <form className="search">
        <div className="search-button">
          <label htmlFor="search">
            <SearchIcon />
          </label>
          <input type="text" id='search' placeholder='Buscar por titulo de produto...'/>
        </div>
        <button className='darkButton'>Pesquisar</button>
        <Link to="/produtos/criar" className='linkButton outLineButton'>+ Criar produto</Link>
      </form>
      <ul className="content">
        {
          products.length > 0 && products.map(product => (
            <li key={product.id}>
              <CardHorizontalProduct id={product.id} title={product.title} price={product.price} imgUrl={product.imgs[0]}/>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default ProductPage