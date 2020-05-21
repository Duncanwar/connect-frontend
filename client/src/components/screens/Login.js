import React,{useState} from 'react'
import {Link} from 'react-router-dom'

const Login = ()=>{
const [name,setName]= useState("")
const [password,setPassword]= useState("")
const [email,setEmail]= useState("")

    return (
       <div className="mycard">
           <div className="card auth-card input-field">
<h2>Instagram</h2>
<input type="text" placeholder="username" /> 
<input type="text" placeholder="email"/>

<button className="btn waves-effect waves-light #64b5f6 blue lighten-2 ">Login</button>
<h5><Link to="/signup">Do you have an account already ?</Link>
</h5>
           </div>
       </div>
    )
} 
export default Login