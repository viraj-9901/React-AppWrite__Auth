import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import Button from './Button'
import Input from './Input'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'

function Signup() {
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const signup = async(data) => {
        setError('')
        try {
            console.log(data);
            const user = await authService.createAccount(data)
            if(user){
                dispatch(authLogin(user))
                navigate('/home')
            }
        } catch (error) {
            console.log('Signup error: ',error.message);
            setError(error.message)
        }
    }

  return (
    <div className='items-center justify-center w-full'>
        <h2 className="text-center text-2xl font-bold leading-tight">
            Create new account
        </h2>
        <form onSubmit={handleSubmit(signup)} className='mt-8'>
            <div className='space-y-5'>
            <Input
                    label='name'
                    type='text'
                    placeholder="Please enter your name"
                    {...register('name',{
                        required: true
                    })
                    }
                />
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
                // onSubmit={signup}    
                >Sign up</Button>
            </div>
        </form>
        <p className="mt-2 text-center text-base text-black/60">
            already have account?&nbsp;
            <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
            >
                Login
            </Link>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        </p>
    </div>
  )
}

export default Signup