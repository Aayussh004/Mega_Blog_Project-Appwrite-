import React, {useId} from 'react'

// forwardRef ek react ki functionality h jise forward reference bolte h
const Input = React.forwardRef( function Input({label, type = "text", className = "", ...props }, ref){//yha pe ek ref bhi as an argument lena hoga as we hve used forwardRef, jo ki aapko is input me reference ke liye use aayega
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label 
            className='inline-block mb-1 pl-1' 
            htmlFor={id}>
                {/* if not want to use htmlFor don't use */}
                {label}
            </label>
            }
            <input
            type={type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            ref={ref}//yhi to main chiz hai jo bhi bnda aapko pukarega use ref pass krna hoga 
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input