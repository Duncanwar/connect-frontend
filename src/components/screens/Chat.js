import React,{useState,useEffect, } from 'react';
import axios from "axios";
import socketIOClient from "socket.io-client";
import {Link,useHistory} from 'react-router-dom';
import jwt_decode from "jwt-decode";

const Chat = () => {
    const history = useHistory()
    const [content, setContent] = useState("")
    const [conversation, setConversation] = useState("")
    const [listUsers, setListUsers] = useState([])
    const [chosenUser, setChosenUser] = useState("")
    const [listMessages, setListMessages] = useState([])
    const [connectedUser,setConnectedUser] = useState("")
    const [input, setInput] = useState('')

    const handleInput = (event) => {
        const input = event.target.id;
        const value = event.target.value;
        setInput({[input]: value})
    }

    const sendMessage= (event) => {
        event.preventDefault();
        const message = {content, user:connectedUser}
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/sendMessage${conversation}`, message,{
            headers:{'Authorization': `Bearer ${localStorage.getItem("jwt")}`}
        }).then(response =>{
            history.push('./signin')
        })
    }

    const clickUser = (idUser) => {
        setChosenUser(idUser);
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/getPrivateMessage/${idUser}/${connectedUser}`,{
            headers:{"Authorization":"Bearer "+localStorage.getItem("jwt")}
        }).then(response =>{
            setConversation(response.data._id)
            setListUsers(response.data.messages)
        })
    }

    useEffect(()=>{
        setConnectedUser(jwt_decode(localStorage.getItem("jwt"))._id)
        const socket = socketIOClient(process.env.REACT_APP_BACKEND_URL)
        
        socket.on("newMessageSended", data =>{
       
            clickUser(chosenUser)
        })
        
        socket.on("newUserAdded", data =>{
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/allUsers`,{
                headers:{"Authorization":"Bearer "+localStorage.getItem("jwt")}
            }).then(response =>{
                setListUsers(response.data.filter(user => user._id !== connectedUser))
                clickUser(response.data[0]._id)
            })
        })
    })

    return (
        <>
       <div className="container">
            <h3 className=" text-center">Messaging</h3>
            <div className="messaging">
              <div className="inbox_msg">
                <div className="inbox_people">
                  <div className="headind_srch">
                    <div className="recent_heading">
                      <h4>Recent</h4>
                    </div>
                  </div>
                  <div className="inbox_chat" >
                    <div className="chat_list">
                    {listUsers.map((el,i) => (
                      <div className="chat_people" key={el._id} onClick={() => clickUser(el._id)}>
                        <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> </div>
                        <div className="chat_ib">
                          <h5>{el.email}</h5>
                        </div>
                      </div>
                    ))}
                    </div>
                  </div>
                </div>
                <div className="mesgs" >
                  <div className="msg_history" >
                  {listMessages.map((el,i) => (
                    <>
                    {el.user !== connectedUser && <div className="incoming_msg ">
                      <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
                      </div>
                      <div className="received_msg">
                        <div className="received_withd_msg">
                          <p>{el.content}</p>
                          <span className="time_date"> {el.CreatedDate}</span>
                        </div>
                      </div>
                    </div>}
                    {el.user === connectedUser &&<div className="outgoing_msg ifUserConnected">
                      <div className="sent_msg">
                        <p>{el.content}</p>
                        <span className="time_date"> {el.CreatedDate}</span>
                      </div>
                    </div>}
                  </>
                  ))}
                </div>
                  <div className="type_msg">
                    <div className="input_msg_write">
                      <form>
                      <input type="text" id="content" onChange={(e) => handleInput(e)} className="write_msg" placeholder="Type a message" />
                      <button className="msg_send_btn" onClick={(e) => sendMessage(e)} type="submit"><i className="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                    </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>     
        </>
    );
};

export default Chat;