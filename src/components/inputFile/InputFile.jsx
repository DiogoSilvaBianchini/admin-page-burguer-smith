import { useState } from 'react'
import './style.css'

const InputFile = ({title, change, value}) => {
  const idInput = Math.floor(Math.random() * 1E2)
  const [previewImgs, setPreviewImgs] = useState([])

  const renderImages = (e) => {
    change(e.target.files)
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

  const activeImage = (e) => {
    const element = e.target
    removeActiveAllElements()
    if(element.className.includes("imgBtn")){
      const btn = element.parentElement
      btn.classList.add("activeBtn")
    }else[
      element.classList.add("activeBtn")
    ]
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
                <li key={i}>
                  <button onClick={activeImage}>
                    <img className='imgBtn' src={imgSrc} alt="preview image" />
                  </button>
                </li>
              ))
            }
          </ul>
        )
      }
    </div>
  )
}

export default InputFile
