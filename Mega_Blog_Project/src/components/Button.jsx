import React from "react";

export default function Button({children, type = "button", bgColor = "bg-blue-600", textColor = "text-white", className = "", ...props}) {
    return (//...props means any other property u want to render so its like "whatever"
        <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    );
}