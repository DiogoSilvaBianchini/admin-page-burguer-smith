import { useEffect, useRef } from 'react'
import './style.css'

const CircleGraph = ({progress, title}) => {
  const circleRef = useRef()

  const activeProgress = () => {
    const circle = circleRef.current
    const timer = setInterval(() => {
      circle.style.strokeDashoffset = 440 - (440 * progress) / 100
      clearInterval(timer)
      console.log(timer)
    }, 500)
  }

  useEffect(activeProgress, [progress])

  return (
    <div className="progress-circle-container">
      <svg className='circle-progress'>
        <circle cx={100} cy={100} r={70} fill="#222"/>
        <circle cx={100} cy={100} r={70} fill="#fff" ref={circleRef}/>
      </svg>
      <div className="text-container">
        <span className='progress-text'>{progress}%</span>
        <span className='progress-text-title'>{title}</span>
      </div>
    </div>
  )
}

export default CircleGraph