import React from 'react'

const FormGroup = ({type, label, placeholder, value, onChange}) => {
  return (
     <div>
            <label htmlFor={label}>{label}</label>
            <input 
            type={type} 
            name={label} 
            id={label}
            value={value}
            onChange={onChange} 
            placeholder={placeholder}
            required/>
    </div>
  )
}

export default FormGroup
