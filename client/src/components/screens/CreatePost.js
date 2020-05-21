import React from 'react'

const CreatePost=()=>{
    return(
        <div className="card input-field" style={{
            margin:"10px auto",
            maxWidth:"500px",
            padding:"20px",
            textAlign:"center"
        }}>
<input type="text" placeholder="title" />
<input type="text" placeholder=""/>
<div class="file-field input-field">
      <div class="btn">
        <span>Upload Image</span>
        <input type="file"/>
      </div>
      <div class="file-path-wrapper">
        <input class="file-path validate" type="text"/>
      </div>
    </div>
        </div>
    )
}
export default CreatePost