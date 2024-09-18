import { useState } from 'react'
import './style.css'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Cookies from 'js-cookie'

const InputFile = ({title, id, idProduct, change, previewImgs, setPreviewImgs, setCoverImg, errorText}) => {
  const token = Cookies.get("token")
  
  const renderImages = (e) => {
    change([...e.target.files])
    const file = [...e.target.files]
    
    file.map((img) => {
      const idImg = Math.floor(Math.random() * 1E2)
      const reader  = new FileReader()
      reader.onloadend = () => {
        setPreviewImgs((value) => [...value, {base64: reader.result, id: idImg}])
      }
      reader.readAsDataURL(img)
    })
  }

  const removeActiveAllElements = () => {
    document.querySelectorAll(".activeBtn").forEach(elements => {
      elements.classList.remove("activeBtn")
    })
  }

  const activeImage = (e, imgSrc) => {
    const element = e.target
    removeActiveAllElements()
    if(element.className.includes("imgBtn")){
      const btn = element.parentElement
      btn.classList.add("activeBtn")
    }else{
      element.classList.add("activeBtn")
    }
    if(imgSrc.s3){
      setCoverImg(`${import.meta.env.VITE_URL_S3}/${imgSrc}`)
    }else{
      setCoverImg(imgSrc.base64)
    }
  }

  const removePreviewButton = (e, urlImg) => {
    const newListImgs = previewImgs.filter(obj => obj.id != urlImg.id)
    setPreviewImgs(newListImgs)
  }

  const removeImage = async (e, urlImg) => {
    if(urlImg.s3){
      const body = {token: `Bearer ${token}`, imgs: [urlImg.s3], id: idProduct}
      const req = await fetch(`${import.meta.env.VITE_BACK_END_URL}/product/img`, {
        headers: {"Content-Type":"application/json"},
        method: "DELETE",
        body: JSON.stringify(body)
      })
      const res = await req.json()
      if(res.status == 201){
        removePreviewButton(e, urlImg)
      }
    }else{
      removePreviewButton(e, urlImg)
    }
  }

  return (
    <div className="input-file-container">
      <label htmlFor={id} className='input-file'>
        <span>{title}</span>
        <input type="file" multiple id={id} onChange={renderImages}/>
      </label>
      {
        previewImgs.length > 0 && (
          <ul className='preview-buttons'>
            {
              previewImgs.map((imgSrc, i) => (
                <li key={i} onMouseEnter={(e) => activeImage(e, imgSrc)} onClick={(e) => removeImage(e, imgSrc)}>
                  <img className='imgBtn' src={imgSrc.s3 ? `${import.meta.env.VITE_URL_S3}/${imgSrc.s3}` : imgSrc.base64} alt="preview image" />
                </li>
              ))
            }
          </ul>
        )
      }
      {
        errorText && <span className='text-error'><InfoOutlinedIcon /> {errorText}</span>
      }
    </div>
  )
}

export default InputFile
