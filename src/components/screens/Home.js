import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'
import {Card} from "react-bootstrap"
import {Bookmark} from "react-bootstrap-icons"

const Home  = ()=>{
    const url = process.env.REACT_APP_BACKEND_URL
    const [data,setData] = useState([])
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
       fetch(`${url}/allpost`,{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           setData(result.posts)
       })
    },[])

    const likePost = (id)=>{
          fetch(`${url}/like`,{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId:id
              })
          }).then(res=>res.json())
          .then(result=>{
            const newData = data.map(item=>{
                if(item._id===result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
          }).catch(err=>{
              console.log(err)
          })
    }
    const unlikePost = (id)=>{
          fetch(`${url}/unlike`,{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId:id
              })
          }).then(res=>res.json())
          .then(result=>{
            const newData = data.map(item=>{
                if(item._id===result._id){
                    console.log(result)
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
          }).catch(err=>{
            console.log(err)
        })
    }

    const makeComment = (text,postId)=>{
          fetch(`${url}/comment`,{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId,
                  text
              })
         }).then(res=>res.json())
          .then(result=>{
                 const newData = data.map(item=>{
                if(item._id===result._id){
                    return result
                }else{
                    return item
                }
             })
            setData(newData)
          }).catch(err=>{
              console.log(err)
          })
    }

    const deletePost = (postid)=>{
        fetch(`${url}/deletepost/${postid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
             const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
    }
const bookMark = ()=>{
return(
    <h2 style={{color:"black"}}>Bookmark

        {console.log("Here")}
    </h2>
)
}
   return (
       <Card>
           {
               data.map(item=>{
                   return(
                       <div className="card home-card" key={item._id}>
                            <h5 style={{padding:"5px"}}>
                                {/* <Bookmark onClick={()=>bookMark()} /> */}
                                <Link to={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id :"/profile"  }>{item.postedBy.name}</Link> {item.postedBy._id == state._id 
                            && <i className="material-icons" style={{
                                float:"right"
                            }} 
                            onClick={()=>deletePost(item._id)}
                            >delete</i>
                            }</h5>
                            <div className="center">
                               <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                </div>
                            <div className="card-image shadow-lg card">
                                <img src={item.photo}/>
                            </div>
                            <div className="card-content shadow-lg">
                            {item.likes.includes(state._id)
                            ? 
                             <i className="material-icons"
                                    onClick={()=>{unlikePost(item._id)}}
                              >thumb_down</i>
                            : 
                            <i className="material-icons"
                            onClick={()=>{likePost(item._id)}}
                            >thumb_up</i>
                            }
                              <h6>{item.likes.length} likes</h6>  
                                {
                                    item.comments.map(record=>{
                                        return(
                                        <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.name}</span> {record.text}</h6>
                                        )
                                    })
                                }
                                <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value,item._id)
                                }}>
                                  <input type="text" placeholder="add a comment" />  
                                </form>                                
                            </div>
                        </div> 
                   )
               })
           }
       </Card>
   )
}

export default Home;