import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'

const Profile = ()=>{
    const [userProfile,setProfile]= useState(null)
    const {state,dispath} = useContext(UserContext)
    const {userid} = useParams()
    useEffect(()=>{
        fetch(`/user/${userid}`,{
            headers:{
                "Authorization":"Bearer " +localStorage.getItem("jwt") 
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
           setProfile(result)
        })
    },[])
    return (
        <>
        {userProfile ?  
        
<div style={{maxWidth:"550px",margin:"0px auto"}}>
           <div style={{
               display:"flex",
               justifyContent:"space-around",
               margin:"18px 0px"
           }}>
           <div>
               <img style={{width:"160px", height:"160px", borderRadius:"80px"}}
               src="https://images.unsplash.com/photo-1518639845127-064c4bd0c574?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
               />
           </div>
           <div>
        <h4>{userProfile.user.name}</h4>
        <h4>{userProfile.user.email}</h4>
               <div style={{display:"flex",
                justifyContent:"space-between", width:"108%"}}>
                   <h5>{userProfile.post.length} posts</h5>
                   <h5>40 followers</h5>
                   <h5>40 following</h5>
               </div>
           </div>
           </div>
       <div className="gallery">
           {
               userProfile.post.map(item=>{
                   return(
                       <img key={item._id} className="item" src={item.photo} alt={item.title}/>
                   )
               })
           }

       </div>
       
       </div>

        :<h2>loading...!</h2>
        }
       
    </>)
}
export default Profile