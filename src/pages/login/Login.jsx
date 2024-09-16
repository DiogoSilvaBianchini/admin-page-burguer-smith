import './style.css'
import InputLabel from '../../components/inputLabel/InputLabel'
import { Link } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import {jwtDecode} from 'jwt-decode'
import { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const googleSucessLogin = (credentialResponse) => {
    let token = credentialResponse.credential
    let decodeToken = jwtDecode(token)
    console.log(decodeToken)
  }

  const googleErrorLogin = (err) => {
    console.log(err)
  }

  return (
    <div className='login-container'>
        <form>
            <h2>Bem-vindo</h2>
            <InputLabel title="E-mail" change={setEmail} value={email}/>
            <InputLabel title="Senha" typeField="password" change={setPassword} value={password}/>
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