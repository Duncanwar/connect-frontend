import React,{useState,useContext} from 'react'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'

const Reset = ()=>{

const history = useHistory();
const [email,setEmail]= useState("")

const PostData = ()=>{
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
    M.toast({html:"invalid email"})
return 
}   

fetch(`${process.env.REACT_APP_BACKEND_URL}/reset-password`,{
    method:"post",
    headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem('jwt')
    },
    body:JSON.stringify({
        email
    })
    }).then(res=>res.json())
    .then(data=>{
       if(data.error){
            M.toast({html: data.error })
        }
        else{       
            M.toast({html: data.message,})
            history.push('/signin')
        }
      
    }).catch(err=>{
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

<button className="btn waves-effect waves-light #64b5f6 blue lighten-2 " onClick={()=>PostData()}>Reset Password</button>
           </div>
       </div>
    )
} 
export default Reset