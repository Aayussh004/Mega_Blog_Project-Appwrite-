import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"//ye nya use kiya h humne react-hook-form

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("")//jb bhi login hoga saare error ko clean krdo
        try {
            const session = await authService.login(data)//store krlo session me jo bhi login de rha h authSlice se
            if (session) {
                const userData = await authService.getCurrentUser()//appwrite ke auth se user ka data aaya hai
                if(userData) dispatch(authLogin(userData));//store me data send krdo
                navigate("/")//ab agr login ho gya hai to navigate krdo *****Important*****
                // Link se bhi kr skte the bt usme link click krna hota hai aur yha ye directly user ko redirect kr dega "/" me, just like useEffect
            }
        } catch (error) {
            setError(error.message)//agr error aaya to
        }
    }

  return (
    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>

        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>

        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>

        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(login)} className='mt-8'>
            {/* handleSubmit Reacthookform ka hi event hai to humne apna login bna kr uss event me paas kr diya hai */}

            <div className='space-y-5'>

                <Input
                label="Email: "//ye whi Components/Input.jsx wala input hai jisme me arguments pass kr rha hu
                placeholder="Enter your email"
                type="email"

                //ye ...register reacthookform ki functionality h
            {...register("email", {//ye ek key aur object leta h jisme aap regX validation lga skte ho for email, password 
                required: true,
                validate: {
                 matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address",
                          }
                })}
                />

                <Input
                label="Password: "//yha pe bhi same whi upr wala krna h
                type="password"
                placeholder="Enter your password"
                {...register("password", {required: true,}//yha pe ek object bhi pass hota h iski jagah me regX or regula expression bhi use kr skta hu for password validation jaise upr kiya h
                )}
                />

                <Button
                type="submit"
                className="w-full"
                >Sign in</Button>

            </div>
        </form>
        </div>
    </div>
  )
}

export default Login