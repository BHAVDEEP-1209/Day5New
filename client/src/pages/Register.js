import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Role from '../components/Role';

const Register = () => {
  const [formValues,setFormValues] = useState({role : "admin"});
  const navigate = useNavigate();

  const handleChange = (e)=>{
    const {name,value} = e.target;
    setFormValues((prev)=>{
      return {
        ...prev,
        [name] : value
      }
    })
  }

  // const handleFileChange = (e)=>{
    
  //   setFormValues((prev)=>{
  //     return {
  //       ...prev,
  //       "image" : e.target.files[0]
  //     }
  //   })
  // }

  const handleClick=async()=>{
    try {
      const result = await axios.post("http://localhost:8000/auth/register",{...formValues});
      if(result.status==201){
        window.alert("User registered successfully!");
        navigate("/");
      }else{
        window.alert("Email exists already!");  
      }
    } catch (error) {
      window.alert("Error while signing up!")
    }
    
  }
  return (
    <div className='register'>

      <input type="text" name="name" id="" placeholder='name' onChange={handleChange}/>
      <input type="text" name="email" id="" placeholder='email' onChange={handleChange}/>
      <input type="text" name="password" id="" placeholder='password' onChange={handleChange}/>
      <Role state={{formValues,setFormValues}}/>
      {/* <label htmlFor="img">
        Upload Image
      </label>
      <input type="file" name="image" id="img" onChange={handleFileChange}/> */}
      <button onClick={handleClick}>Submit</button>
    </div>
  )
}

export default Register