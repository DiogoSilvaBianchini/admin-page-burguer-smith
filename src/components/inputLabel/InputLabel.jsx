import './style.css'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const InputLabel = ({title, id, typeField, change, value, errorText}) => {
  return (
    <label htmlFor={id} className='input-label'>
        <span>{title}</span>
        <input type={typeField ? typeField : "text"} id={id} autoComplete={typeField == "password" ? "current-password":"none"} value={value} onChange={(e) => change(e.target.value)}/>
        {errorText && <span className='input-label-error text-error'><InfoOutlinedIcon /> {errorText ? errorText : `O campo obrigatorio`}</span>}
    </label>
  )
}

export default InputLabel