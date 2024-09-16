import './style.css'
import InputLabel from '../../components/inputLabel/InputLabel'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Register = () => {
    const [name, setName] = useState("")
    const [nameError, setNameError] = useState("")
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [confirmEmail, setConfirmEmail] = useState("")
    const [confirmEmailError, setConfirmEmailError] = useState("")
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")
    const [term, setTerm] = useState(false)
    const [termError, setTermError] = useState(false)

    const navigate = useNavigate()

    const handdleSubmite = async (e) => {
        e.preventDefault()
        const body = createBody()
        const validated = validationForm()
        if(validated){
            const req = await fetch(`${import.meta.env.VITE_BACK_END_URL}/user`, {
                headers: {"Content-Type":"application/json"},
                method: "POST",
                body: JSON.stringify(body)
            })

            const res = await req.json()

            if(res.status == 201){
                navigate("/")
            }

            if(res.results == "E-mail já registrado"){
                setEmailError("E-mail já registrado")
            }
        }
    }

    const validationForm = () => {
        let validate = true
        if(!name){
            setNameError("Campo obrigátorio") 
            validate = false
        }else{
            setNameError("") 
        }
        if(!email){
            setEmailError("Campo obrigátorio")
            validate = false
        }else{
            setEmailError("")
        }
        if(!confirmEmail){
            setConfirmEmailError("Campo obrigátorio")
            validate = false
        }else{
            setConfirmEmailError("")
        }
        if(!password){
            setPasswordError("Campo obrigátorio")
            validate = false
        }else{
            setPasswordError("")
        }
        if(!confirmPassword){
            setConfirmPasswordError("Campo obrigátorio")
            validate = false
        }else{
            setConfirmPasswordError("")
        }
        if(confirmEmail !== email){
            setConfirmEmailError("E-mails não são iguais")
            validate = false
        }
        if(password !== confirmPassword){
            setConfirmPasswordError("As senhas não são iguais")
            validate = false
        }
        if(!term){
            setTermError(true)
            validate = false
        }else{
            setTermError(false)
        }
        return validate
    }

    const createBody = () => {
        return {name, email, password}
    }

  return (
    <div className='container-register'>
        <form onSubmit={handdleSubmite}>
            <h2>Registre-se</h2>
            <span>Seja bem-vindo(a) ao seu dashbord administrativo.</span>
            <InputLabel title={"Nome"} change={setName} value={name} errorText={nameError}/>
            <InputLabel title={"E-mail"} change={setEmail} value={email} errorText={emailError}/>
            <InputLabel title={"Confirme seu e-mail"} change={setConfirmEmail} value={confirmEmail} errorText={confirmEmailError}/>
            <InputLabel title={"Senha"} typeField={"password"} change={setPassword} value={password} errorText={passwordError}/>
            <InputLabel title={"Confirme sua Senha"} typeField={"password"} change={setConfirmPassword} value={confirmPassword} errorText={confirmPasswordError}/>
            <label htmlFor="term">
                <input type="checkbox" name="term" id="term" onChange={(e) => setTerm(e.target.checked)} checked={term}/>
                <span className={termError ? "textError":""}> Li e concordo com os <a href='#'>Termos e condições</a> de uso dessa aplicação</span>
            </label>
            <button className='darkButton'>Concluir</button>
            <Link to="/login" className='linkButton outLineButton'>Já possuo registro</Link>
        </form>
    </div>
  )
}

export default Register