import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'
import { Button } from 'react-bootstrap';

const Profile = ()=>{
    const url = process.env.REACT_APP_BACKEND_URL
    const [userProfile,setProfile]= useState(null)
    const {userid} = useParams()
    const {state,dispatch} = useContext(UserContext)
    const [showFollow,setFollow] = useState(state ? !state.following.includes(userid): true)
    useEffect(()=>{
        fetch(`${url}/user/${userid}`,{
            headers:{
                "Authorization":"Bearer " +localStorage.getItem("jwt") 
            }
        }).then(res=>res.json())
        .then(result=>{
           setProfile(result)
        })
    },[])
    
    const viewfollow =()=>{
        fetch(`${url}/follow`,{
            method:'put',
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
           dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
           localStorage.setItem("user",JSON.stringify(data))
           setProfile((prevState)=>{
               
               return {
                   ...prevState,
                   user:{...prevState.user,
                followers:[...prevState.user.followers,data._id]
                }
               }
           })
           setFollow(false)
        })
    }
    const unviewfollow =()=>{
        fetch(`${url}/unfollow`,{
            method:'put',
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
           dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
           localStorage.setItem("user",JSON.stringify(data))
           setProfile((prevState)=>{
               const newFollower = prevState.user.followers.filter(item=>item != data._id)
               return {
                   ...prevState,
                   user:{...prevState.user,
                followers:newFollower
                }
               }
           })
           setFollow(true)
        })
    }

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
                justifyContent:"space-between", width:"118%"}}>
                   <h5>{userProfile.post.length} posts</h5>
        <h5 onClick={()=>viewfollow(userProfile.user._id)}>{userProfile.user.followers.length} followers</h5>
        <h5>{userProfile.user.following.length}following</h5>
        {showFollow? <Button onClick={()=>viewfollow()}>follow</Button> :  <Button onClick={()=>unviewfollow()}>unfollow</Button>}
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