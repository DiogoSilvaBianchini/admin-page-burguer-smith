import { useState } from 'react'
import './style.css'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const InputFile = ({title, change, previewImgs, setPreviewImgs, setCoverImg, errorText}) => {
  const idInput = Math.floor(Math.random() * 1E2)
  

  const renderImages = (e) => {
    change([...e.target.files])
    const file = [...e.target.files]

    file.map((img) => {
      const reader  = new FileReader()
      reader.onloadend = () => {
        setPreviewImgs((value) => [...value, reader.result])
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
    setCoverImg(imgSrc)
  }

  return (
    <div className="input-file-container">
      <label htmlFor={`fileInpt${idInput}`} className='input-file'>
        <span>{title}</span>
        <input type="file" multiple id={`fileInpt${idInput}`} onChange={renderImages}/>
      </label>
      {
        previewImgs.length > 0 && (
          <ul className='preview-buttons'>
            {
              previewImgs.map((imgSrc, i) => (
                <li key={i} onClick={(e) => activeImage(e, imgSrc)}>
                  <img className='imgBtn' src={imgSrc} alt="preview image" />
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
