import './style.css'

const SelectorLabel = ({title, options, change}) => {
  return (
    <select className='selector-form' onChange={(e) => change(e.target.value)}>
        <option value="">{title}</option>
        {
            options && options.map(value => {
                <option value={value}>{value}</option>
            })
        }
    </select>
  )
}

export default SelectorLabel