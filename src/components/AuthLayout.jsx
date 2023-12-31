import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

function AuthLayout(children) {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const authStatus = useSelector((state) => state.auth.status)

  useEffect(() => {
    if(authStatus === true){
      navigate('/')
    }else {
      navigate('/login')
    }
    setLoading(false)
  },[authStatus, navigate])


  return loading ? (<h1>Loading...</h1>) : (<>{children}</>)
}
export default AuthLayout