import React,{useState,useContext} from 'react'
import {UserContext} from '../../App'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'

const Login = ()=>{
const {state,dispatch} = useContext(UserContext)
const history = useHistory();
const [password,setPassword]= useState("")
const [email,setEmail]= useState("")

const PostData = ()=>{ 
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
    M.toast({html:"invalid email"})
return 
}   

fetch(`${process.env.REACT_APP_BACKEND_URL
}/signin`,{
    method:"post",
    headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem('jwt')
    },
    body:JSON.stringify({
        password,
        email
    })
    }).then(res=>res.json())
    .then(data=>{
       if(data.error){
            M.toast({html: data.error })
        }
        else{
            localStorage.setItem('jwt',data.token)
            localStorage.setItem('user',JSON.stringify(data.user))
            dispatch({type:"USER",payload:data.user})
            M.toast({html: "signin success",})
            history.push('/')  
        }
      
    }).catch(err=>{
        console.log(process.env.REACT_APP_BACKEND_URL)
        console.log(err)
    })
}

    return (
       <div className="mycard">
           <div className="card auth-card input-field">
<h2>Instagram</h2>
<input type="text" 
placeholder="email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>
<input type="password" 
placeholder="password" 
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button className="btn waves-effect waves-light #64b5f6 blue lighten-2 " onClick={()=>PostData()}>Login</button>
<h5><Link to="/signup">You don't have an account ?</Link></h5>
<h6><Link to="/reset">Forgot Password </Link></h6>
     </div>
       </div>
    )
} 
export default Login