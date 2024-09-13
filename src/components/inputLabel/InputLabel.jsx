import './style.css'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const InputLabel = ({title, change, value, errorText}) => {
  return (
    <label htmlFor='title' className='input-label'>
        <span>{title}</span>
        <input type="text" id='title' value={value} onChange={change}/>
        {errorText && <span className='input-label-error'><InfoOutlinedIcon /> {errorText}</span>}
    </label>
  )
}

export default InputLabel