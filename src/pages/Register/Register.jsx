import './style.css'
import InputLabel from '../../components/inputLabel/InputLabel'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className='container-register'>
        <form>
            <h2>Registre-se</h2>
            <span>Seja bem-vindo(a) ao seu dashbord administrativo.</span>
            <InputLabel title={"Nome"}/>
            <InputLabel title={"E-mail"}/>
            <InputLabel title={"Confirme seu e-mail"}/>
            <InputLabel title={"Senha"}/>
            <InputLabel title={"Confirme sua Senha"}/>
            <label htmlFor="term">
                <input type="checkbox" name="term" id="term" />
                <span> Li e concordo com os <a href='#'>Termos e condições</a> de uso dessa aplicação</span>
            </label>
            <button className='darkButton'>Concluir</button>
            <Link to="/login" className='linkButton outLineButton'>Já possuo registro</Link>
        </form>
    </div>
  )
}

export default Register