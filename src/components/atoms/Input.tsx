import React from "react"

interface InputProps {
  id: string
  name: string
  type?: string
  placeholder?: string
  value?: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  label?: string
  required?: boolean
  disabled?: boolean
  min?: string
}

const Input: React.FC<InputProps> = ({
  id,
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
  label,
  required = false,
  disabled = false,
  min,
}) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label
          htmlFor={id}
          className="mb-1 text-sm font-medium text-gray-700"
        >
          {label} {required && <span className="text-red-600">*</span>}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={min}
        disabled={disabled}
        required={required}
        className={`rounded-md border text-blue-500 border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
          disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
        } ${className}`}
      />
    </div>
  )
}

export default Input
