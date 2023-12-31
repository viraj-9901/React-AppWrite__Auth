import React from 'react'
import Button from './Button'
import {useDispatch} from 'react-redux'
import authService from '../appwrite/auth'
import { useNavigate } from 'react-router-dom'
import { logout as AuthLogout } from '../store/authSlice'

function Home() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const logout = async() => {
    //     try {
    //     return await authService.logout()
    //     dispatch(AuthLogout)
    //     navigate('/')
    //     } catch (error) {
    //         console.log("logout error: ", error.message);
    //     }
    // }

    const data = async() =>{
        try {
            const user = await authService.getCurrentUser()
            // console.log(user);
            if(user){
                await authService.logout()
                dispatch(AuthLogout(user))
                navigate('/')
            }
        } catch (error) {
            console.log(error.message);
        }
        
    }
  return (
    <>
        <div>Home</div>
        <Button 
            type='submit'
            className='w-full'
            onClick={data}
        >Logout</Button>
    </>
  )
}

export default Home