import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'
import {Card} from "react-bootstrap"
import {Bookmark} from "react-bootstrap-icons"

const BookMark  = ()=>{
    const url = process.env.REACT_APP_BACKEND_URL
    const [data,setData] = useState([])
    const [tryd,setTryd] = useState([])
    const {state,dispatch} = useContext(UserContext)
    const [isLoaded, setIsLoaded] = useState(false)
    useEffect(()=>{
    
       fetch(`${url}/bookmark`,{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>
           
        res.json())
       .then(result=>{
           console.log(result)
           setTryd(result.bookmark)
           setIsLoaded(true)
        // setData(result.bookmark)
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
               {!isLoaded ?  <div>Loading...</div>

           {
               tryd.map(item=>{
                   return(
                       <div className="card home-card" key={item._id}>
                            <h5 style={{padding:"5px"}}>
                                <Bookmark onClick={()=>bookMark()} />
                                
                                <Link to={item.bookmarkedBy._id !== state._id?"/profile/"+item.bookmarkedBy._id :"/profile"  }>{item.bookmarkedBy.name}</Link> {item.bookmarkedBy._id == state._id 
                            && <i className="material-icons" style={{
                                float:"right"
                            }} 
                            onClick={()=>deletePost(item._id)}
                            >delete</i>
                            }</h5>
                            <div className="center">
                                {console.log(item.postedId)}
                               <h6>{item["postedId"].title}</h6>
                                <p>{item["postedId"].body}</p>
                                </div>
                            <div className="card-image shadow-lg card">
                                <img src={item.photo}/>
                            </div>
                            <div className="card-content shadow-lg">
                            {/* {console.log(item["postedId"].likes.includes(state._id))} */}
                            {item["postedId"].likes.includes(state._id)
                            ? 
                             <i className="material-icons"
                                    onClick={()=>{unlikePost(item._id)}}
                              >thumb_down</i>
                            : 
                            <i className="material-icons"
                            onClick={()=>{likePost(item._id)}}
                            >thumb_up</i>
                            }
                            
                              <h6>{item["postedId"].likes.length} likes</h6>  
                                {
                                    item["postedId"].comments.map(record=>{
                                        return(
                                        <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.name}</span> {record.text}</h6>
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

export default BookMark;