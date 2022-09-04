import React, { useContext } from 'react'
import { FormContext } from '../../FormContext'
const Input = ({id,label, type, options, validations}) => {

    const {handleChange} = useContext(FormContext)

    return (
        <div className="form-group ">
            {/* <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" /> */}
            <label>{label}:  </label>
            <input onChange={(event)=>handleChange(id,event)} type={type} name={id} id={id} ></input>
        </div>
    )
}
export default Input