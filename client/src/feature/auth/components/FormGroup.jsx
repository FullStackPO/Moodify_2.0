import React from 'react'

const FormGroup = ({type, label, placeholder}) => {
  return (
     <div>
            <label htmlFor={label}>{label}</label>
            <input 
            type={type} 
            name={label} 
            id={label} 
            placeholder={placeholder}
            required/>
    </div>
  )
}

export default FormGroup
