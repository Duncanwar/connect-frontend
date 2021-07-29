import React ,{useEffect,createContext,useReducer,useContext}from 'react';
import './App.css';
import Nav from './components/Navbar'
import {BrowserRouter,Route, Switch, useHistory} from 'react-router-dom'
import Home from './components/screens/Home'
import Signin from './components/screens/Login'
import Signup from './components/screens/Signup'
import Profile from './components/screens/Profile'
import CreatePost from './components/screens/CreatePost'
import {reducer,initialState} from './reducers/userReducer'
import UserProfile from './components/screens/UserProfile'
import UserSubscribe from './components/screens/UserSubscribe'
import Reset from "./components/screens/Reset"
import NewPassword from "./components/screens/Newpassword";
import Chat from "./components/screens/Chat"
// import BookMark from './components/screens/BookMark';

export const UserContext = createContext()

const Routing = () =>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
if(user){
  dispatch({type:"USER",payload:user})
}else{
  if(!history.location.pathname.startsWith("/reset"))
  history.push('/signin')
}
  },[])

  return(
    <Switch>
<Route exact path="/" >
      <Home />
      </Route>
      <Route path="/signin">
        <Signin />
      </Route>
      <Route path="/signup">
        <Signup/>
      </Route>
      <Route exact path = "/profile">
        <Profile />
      </Route>
      <Route path="/createpost">
        <CreatePost />
      </Route>
      <Route path="/profile/:userid">
        <UserProfile />
      </Route>
      <Route path="/bookMark">
        {/* <BookMark /> */}
      </Route>
      <Route exact path="/reset">
        <Reset />
      </Route>
      <Route path="/reset/:token">
        <NewPassword />
      </Route>
      <Route path="/chat">
        <Chat />
      </Route>
    </Switch>
  )
}

const Admin = () => {
  return(
    <Switch>
      <Route>
        {/* <AppShell path="/dashboard">
          <Dashboard />
        </AppShell> */}
      </Route>
      </Switch>
  )
}
function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}} >
    <BrowserRouter>
    <Nav />
    <Routing />
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
