import './style.css'
import InputLabel from '../../components/inputLabel/InputLabel'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import {jwtDecode} from 'jwt-decode'
import { useContext, useState } from 'react'
import Cookies from 'js-cookie'
import UserContext from '../../context/userContext'

const Login = () => {
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  
  const googleSucessLogin = async (credentialResponse) => {
    let token = credentialResponse.credential
    let decodeToken = jwtDecode(token)
    const payload = {
      name: decodeToken.name,
      email: decodeToken.email
    }

    const req = await fetch(`${import.meta.env.VITE_BACK_END_URL}/user/login/google`, {
      headers: {"Content-Type":"application/json"},
      method: "POST",
      body: JSON.stringify(payload)
    })
    
    const res = await req.json()
   
    if(res.status == 301){
      navigate(`/simpleRegister?name=${payload.name}&email=${payload.email}`)
    }else{
      const token = res.results
      createCookie(token)
      navigate("/produtos")
    }
  }

  const googleErrorLogin = (err) => {
    console.log(err)
  }
  
  const validation = () => {
    let validate = true
    if(!email){
      setEmailError("Campo obrigatorio")
      validate = false
    }else{
      setEmailError("")
    }

    if(!password){
      setPasswordError("Campo obrigatorio")
      validate = false
    }else{
      setPasswordError("")
    }

    return validate
  }

  const createBody = () => {
    return {email, password}
  }

  const createCookie = (token) => {
    Cookies.set("token", token, {
      expires: 1,
      secure: false,
      sameSite: 'Strict'
    })
    return true
  }

  const handdleSubmite = async (e) => {
    e.preventDefault()
    const validate = validation()
    const body = createBody()

    if(validate){
      const req = await fetch(`${import.meta.env.VITE_BACK_END_URL}/user/login`, {
        headers: {"Content-Type":"application/json"},
        method: "POST",
        body: JSON.stringify(body)
      })
      const res = await req.json()
      if(res.status == 401){
        setError("E-mail ou senha incorreto!")
      }else{
        createCookie(res.results)
        navigate("/produtos")
      }
    }
  }

  return (
    <div className='login-container'>
        <form onSubmit={handdleSubmite}>
            <h2>Bem-vindo</h2>
            {error && <span className='errorText'>{error}</span>}
            <InputLabel title="E-mail" change={setEmail} value={email} errorText={emailError}/>
            <InputLabel title="Senha" typeField="password" change={setPassword} value={password} errorText={passwordError}/>
            <div className="settings">
                <label htmlFor="loginSave" className='label-save'>
                    <input type="checkbox" name="loginSave" id="loginSave" />
                    <span>Manter-se conectado</span>
                </label>
                <Link>Esqueceu sua senha?</Link>
            </div>
            <button type='submit' className='darkButton'>Login</button>
            <Link to='/register' className='linkButton outLineButton'>Registra-se</Link>
            <span>ou</span>
            <GoogleLogin 
              onSuccess={googleSucessLogin} 
              onError={googleErrorLogin}
              />
        </form>
    </div>
  )
}
// 200.201.196.136
export default Login