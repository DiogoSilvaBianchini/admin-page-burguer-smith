import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import UserContext from '../context/userContext'
import Cookies from 'js-cookie'

const AutoGuard = () => {
    const navigate = useNavigate()
    const {user, setUser} = useContext(UserContext)

    useEffect(() => {
        const checkAuth = async () => {
            const token = Cookies.get("token")
            const req = await fetch(`${import.meta.env.VITE_BACK_END_URL}/user/checkin`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            const res = await req.json()

            if(res.status == 401){
                navigate("/login")
                setUser({})
            }else{
                setUser(res.results)
            }
        }
        checkAuth()
    },[])

  return user ? <Outlet /> : null
}

export default AutoGuard