import React,{useState, useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import axios from "axios";

const SignUp = ()=>{
const history = useHistory();
const [name,setName]= useState("")
const [password,setPassword]= useState("")
const [email,setEmail]= useState("")
const [image,setImage]= useState("")
const [url,setUrl]=useState(undefined)

// useEffect(()=>{
// if(url){
//     uploadFields()
// }
// },[url])

// const postPic=()=>{

// const data = new FormData()
// data.append("file",image)
// data.append("upload_preset", "insta-clone")
// data.append("cloud_name", "semugeshi")
// fetch("https://api.cloudinary.com/v1_1/semugeshi/image/upload",{
//     method:"post",
//     body:data
// }).then(res=>res.json())
// .then(data=>setUrl(data.url))
// .catch(err=>
//     console.log(err))
// }

const uploadFields= async ()=>{
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        M.toast({html:"invalid email"})
        return 
           }
        console.log("here",{name,email,password})
        try{
            const data = await axios.post(`${process.env.REACT_APP_BACKEND_URL}
            /signup`,{name,
                password,
                email})
            console.log(data.data)
        }catch(error){
            console.log(error)
        }

        //     fetch(`${process.env.REACT_APP_BACKEND_URL}
        //     /signup`,{
        // method:"post",
        // headers:{
        //     "Content-Type":"application/json",
        //     "Authorization":"Bearer "+localStorage.getItem("jwt")
        // },
        // body:JSON.stringify({
        //     name,
        //     password,
        //     email
        // })
        // }).then(res=>res.json())
        // .then(data=>{
        //    if(data.error){
        //         M.toast({html: data.error, })
        //     }
        //     else{
        //         M.toast({html: data.message,})
        //         history.push('/signin')
        //     }
        // }).catch(err=>{
        //     console.log(err)
        // })
}



    return (
       <div className="mycard">
           <div className="card auth-card input-field">
<h2>Signup</h2>

<input type="text"
 placeholder="username" 
value={name}
onChange={(e)=>setName(e.target.value)}
/> 
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
{/* <div className="file-field input-field">
      <div className="btn">
        <span>Upload profile</span>
        <input type="file"
        onChange={(e)=>setImage(URL.createObjectURL(e.target.files[0]),)}
        />
      </div>
      <div className="responsive-img">
        <img className="responsive-img" src={image}/>
      </div>
    </div> */}
<button 
className="btn waves-effect waves-light #64b5f6 blue lighten-2" onClick={()=>uploadFields()}>
    Signup</button>
<h5><Link to="/signin">Have an account already </Link>
</h5>
           </div>
       </div>
    )
}
export default SignUp;