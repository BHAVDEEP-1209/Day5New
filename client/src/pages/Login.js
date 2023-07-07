import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {setValue} from "../slices/userSlice.js"

const Login = () => {
  const [formValues,setFormValues] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e)=>{
    const {name,value} = e.target;
    setFormValues((prev)=>{
      return {
        ...prev,
        [name] : value
      }
    })
  }

  const handleClick=async()=>{
    try {
      const result = await axios.post("http://localhost:8000/auth/login",{...formValues});
      
      if(result.status==200){
        window.alert("success!");
        dispatch(setValue(result.data));
        navigate("/homepage");
      }else if(result.status==204){
        window.alert("no email exists!");
      }else{
        window.alert("wrong password!");
      }
    
    } catch (error) {
      window.alert("Error while logging in!");
    }
    
  }

  return (
    <div className='register'>
      <input type="text" name="email" id="" placeholder='email' onChange={handleChange}/>
      <input type="text" name="password" id="" placeholder='password' onChange={handleChange}/> 
      <button onClick={handleClick}>Submit</button>
    </div>
  )
}

export default Login