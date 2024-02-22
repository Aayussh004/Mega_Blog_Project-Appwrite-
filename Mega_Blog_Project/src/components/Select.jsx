import React, {useId} from 'react'
// for dropdown menu ke liye
function Select({options, label, className="", ...props }, ref) {//ref forwardRef ke liye liya h
    const id = useId()
  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className=''></label>}
        {/* waise label ki zarurat hai nhi chaho to hta do */}
        <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        >
            {options?.map((item) => (//if it exits ke liye "?" lagaye hai, jo parameter me pass kiye whi option h ye nd array h
                <option key={item} value={item}>
                    {item}
                </option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)//pichli file me Input me humne function declaration ke paas likha tha ye humne