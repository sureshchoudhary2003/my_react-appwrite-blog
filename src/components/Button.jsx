import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props
}) {
  return (
    <button
        type={type}
        className={`rounded-lg px-4 py-6 ${bgColor} ${textColor} ${className}`}
        {...props}
    >{children}</button>
  )
}

export default Button