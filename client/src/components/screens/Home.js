import React,{useState,useEffect} from 'react'

const Home = ()=>{
    const [data,setData] = useState([])
    useEffect(()=>{
        fetch('/allpost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result =>{
            console.log(result)
            setData(result.posts)
        })
    },[])
    return (
        <div className="home">
            hu{
                data.map(item=>{
                    return (
<div className="card home-card">
                    <h5>{item.postedBy.name}</h5>
                <div className="card-image">
                    <img src={item.photo} alt=''/>
                    </div>
                    <div className="card-content">
                    <h6>{item.title}</h6>
                        
  <i className="material-icons" style={{color:"red"}}>favorite</i>
            
                    <p>{item.body}hy</p>
                        <input type="text" placeholder="add comment" />
                   
                </div>

            </div>
                    )
                })
            }
            
        </div>
    )
}
export default Home