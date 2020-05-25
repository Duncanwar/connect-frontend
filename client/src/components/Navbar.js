import React,{useContext} from 'react'
import {UserContext, } from '../App'
import {Link,useHistory} from 'react-router-dom'
const NavBar = ()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  const renderList= ()=>{
    if(state){
      return[
      <li><Link to="/profile">Profile</Link></li>,
            <li><Link to="/createpost">CreatePost</Link></li>,
            <li><button 
            className="btn waves-effect waves-light #64b5f6 blue lighten-2" onClick={()=>{
              localStorage.clear()
              dispatch({type:"CLEAR"})
              history.push('./signin')
            }}>
                Signout</button></li>
      ]}else{
        return [
          <li><Link to="/signin">Login</Link></li> ,
          <li><Link to="/signup">Signup</Link></li>
        ]
      }
  }
    return(
        <nav>
        <div className="nav-wrapper white">
          <Link to={state ?"/":"/signin"} className="brand-logo left">Instagram</Link>
          <ul id="nav-mobile" className="right">
           {renderList()}
            
          </ul>
        </div>
      </nav>
    )
}

export default NavBar