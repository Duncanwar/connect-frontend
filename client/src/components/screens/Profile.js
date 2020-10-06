import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'

const Profile = ()=>{
    const [mypics,setPics]= useState([])
    const {state,dispatch} = useContext(UserContext)
    const [image,setImage] = useState("")
    useEffect(()=>{
        console.log(state)
        fetch('https://sleepy-shore-85012.herokuapp.com/allpost/myposts',{
            headers:{
                "Authorization":"Bearer " +localStorage.getItem("jwt") 
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result,state)
           setPics(result.mypost)
        })
    },[])

    useEffect(()=>{
        if(image){
            const data = new FormData()
data.append("file",image)
data.append("upload_preset", "insta-clone")
data.append("cloud_name", "semugeshi")
fetch("https://api.cloudinary.com/v1_1/semugeshi/image/upload",{
    method:"post",
    body:data
}).then(res=>res.json())
.then(data=>{
    

    fetch("/updatepic",{
        method:"put",    
        headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer "+localStorage.getItem("jwt")
    },
    body:JSON.stringify({
        pic:data.url
    })
    
}).then(res=>res.json())
.then(result=>{
    console.log(result)
    localStorage.setItem("user",JSON.stringify({...state,photo:result.pic}))
    dispatch({type:"UPDATEPIC",payload:result.pic})
})
})
.catch(err=>
    console.log(err))

        
    }},[image])

const changePhoto=(file)=>{
setImage(file)
}

    return (
       <div style={{maxWidth:"550px",margin:"0px auto"}}>
           <div style={{
               display:"flex",
               justifyContent:"space-around",
               margin:"18px 0px"
           }}>
           <div>
               <img style={{width:"160px", height:"160px", borderRadius:"80px"}}
               src={state? state.photo : "loading..."}
               />

<div className="file-field input-field">
      <div className="btn">
        <span>Upload profile</span>
        <input type="file"
        onChange={(e)=>changePhoto(e.target.files[0])}
        />
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"/>
      </div>
    </div>

           </div>
           <div>
        <h4>{state?state.name :"loading"}</h4>
               <div style={{display:"flex", justifyContent:"space-between", width:"108%"}}>
                   <h5>{mypics.length} posts</h5>
                   <h5>{state? state.followers.length :"0"} followers</h5>
                   <h5>{state? state.following.length :"0"} following</h5>
               </div>
           </div>
           </div>
       <div className="gallery">
           {
               mypics.map(item=>{
                   return(
                       <img key={item._id} className="item" src={item.photo} alt={item.title}/>
                   )
               })
           }

       </div>
       
       </div>
    )
}
export default Profile