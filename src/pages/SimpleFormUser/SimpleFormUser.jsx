import './style.css'
import { useState } from 'react'
import InputLabel from '../../components/inputLabel/InputLabel'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

const SimpleFormUser = () => {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const validate = () => {
        let validated = true
        if(password != confirmPassword){
            validated = false
            setConfirmPasswordError("As senhas não são iguais")
        }
        return validated
    }

    const handdleSubmite = async (e) => {
        e.preventDefault()
        const validated = validate()

        if(validated){
            const body = {
                name: searchParams.get("name"),
                email: searchParams.get("email"),
                password: password
            }
    
            const req = await fetch(`${import.meta.env.VITE_BACK_END_URL}/user`, {
                headers: {"Content-Type":"application/json"},
                method: "POST",
                body: JSON.stringify(body)
            })
    
            const res = await req.json()
            if(res.status == 201){
                navigate("/login")
            }
        }
    }
  return (
    <div className='register-container'>
        <form onSubmit={handdleSubmite}>
            <h2>Registre uma senha</h2>
            <InputLabel title="Senha" id="password" change={setPassword} value={password} typeField="password" />
            <InputLabel title="Confirme sua senha" id="cPassword" change={setConfirmPassword} value={confirmPassword} errorText={confirmPasswordError} typeField="password" />
            <button className='darkButton'>Registrar</button>
            <Link to="/login" className='linkButton outLineButton'>Já possuo registro</Link>
        </form>
    </div>
  )
}

export default SimpleFormUser