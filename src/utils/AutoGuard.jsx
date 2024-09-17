import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import UserContext from '../context/userContext'
import Cookies from 'js-cookie'

const AutoGuard = () => {
    const navigate = useNavigate()
    const {token, setToken} = useContext(UserContext)

    useEffect(() => {
        const token = Cookies.get("token")
        if(!token){
            navigate("/login")
        }else{
            setToken(token)
        }
    },[])

  return token ? <Outlet /> : null
}

export default AutoGuard