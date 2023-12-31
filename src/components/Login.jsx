import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import Button from './Button'
import Input from './Input'
import authService from '../appwrite/auth'
import {Link, useNavigate} from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'
import { useForm } from "react-hook-form"
 
function Login() {
    const {register, handleSubmit} = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError('')
        try {
            const user = await authService.login(data)
            if(user){
                dispatch(authLogin(user))
                navigate('/home')
             }
        } catch (error) {
            console.log('Login error: ',error.message);
            setError(error.message)
        }
        
    }
  return (
    <div className='items-center justify-center w-full'>
        <h2 className="text-center text-2xl font-bold leading-tight">
            Log in to your account
        </h2>
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                    label='email'
                    type="email"
                    placeholder = 'Please enter email'
                    {...register('email',{
                        required: true,
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address"
                    })
                    }
                />
                <Input
                    label='password'
                    type='password'
                    placeholder="Please enter password"
                    {...register('password',{
                        required: true
                    })
                    }
                />
                <Button
                type="submit"
                className="w-full"
                >Login</Button>
            </div>
        </form>
        <p className="mt-2 text-center text-base text-black/60">
            Don&apos;t have any account?&nbsp;
            <Link
            to="/"
            className="font-medium text-primary transition-all duration-200 hover:underline"
            >
                Sign Up
            </Link>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        </p>
    </div>
  )
}

export default Login